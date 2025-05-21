import { useEffect } from 'react';
import { useEditMedicineMutation } from '../../../redux/api';
import styles from './styles.module.scss';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';

interface EditMedicineForm {
    name: string;
    type: string;
    criticalNorm: number;
    quantity: number;
    price: number;
    recipeId?: number;
}

interface EditMedicineProps {
    initialValues: EditMedicineForm & { id: number };
    onSuccess?: () => void;
}

export const EditMedicine = ({ initialValues, onSuccess }: EditMedicineProps) => {
    const [form] = Form.useForm();
    const [editMedicine] = useEditMedicineMutation();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const onFinish = async (values: EditMedicineForm) => {
        try {
            await editMedicine({
                id: initialValues.id,
                medicine: {
                    name: values.name,
                    type: values.type,
                    criticalNorm: values.criticalNorm,
                    quantity: values.quantity,
                    price: values.price,
                    recipeId: values.type === 'manufacturable' ? (values.recipeId ?? 1) : 0
                }
            }).unwrap();
            message.success('Лекарство успешно обновлено');
            onSuccess?.();
        } catch (error) {
            message.error('Ошибка при обновлении лекарства');
            console.error('Ошибка при обновлении лекарства:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className={styles.form}
                initialValues={initialValues}
            >
                <Form.Item
                    name="name"
                    label="Название"
                    rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
                >
                    <Input placeholder="Введите название лекарства" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Тип"
                    rules={[{ required: true, message: 'Пожалуйста, выберите тип' }]}
                >
                    <Select placeholder="Выберите тип">
                        <Select.Option value="ready">Готовое</Select.Option>
                        <Select.Option value="manufacturable">Приготавливаемое</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="criticalNorm"
                    label="Критическая норма"
                    rules={[{ required: true, message: 'Пожалуйста, введите критическую норму' }]}
                >
                    <InputNumber min={0} placeholder="Введите критическую норму" />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label="Количество"
                    rules={[{ required: true, message: 'Пожалуйста, введите количество' }]}
                >
                    <InputNumber min={0} placeholder="Введите количество" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Цена"
                    rules={[{ required: true, message: 'Пожалуйста, введите цену' }]}
                >
                    <InputNumber min={0} step={0.01} placeholder="Введите цену" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}; 