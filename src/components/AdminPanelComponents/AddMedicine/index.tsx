import { useState } from 'react';
import { useAddMedicineMutation, useGetRecipeQuery } from '../../../redux/api';
import styles from './styles.module.scss';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';

interface AddMedicineForm {
    name: string;
    type: string;
    criticalNorm: number;
    quantity: number;
    price: number;
    recipeId?: number;
}

interface AddMedicineProps {
    onSuccess?: () => void;
}

export const AddMedicine = ({ onSuccess }: AddMedicineProps) => {
    const [form] = Form.useForm();
    const [addMedicine] = useAddMedicineMutation();
    const { data: recipes } = useGetRecipeQuery();
    const [type, setType] = useState('');

    const onFinish = async (values: AddMedicineForm) => {
        try {
            await addMedicine({
                name: values.name,
                type: values.type,
                criticalNorm: values.criticalNorm,
                quantity: values.quantity,
                price: values.price,
                recipeId: values.type === 'manufacturable' ? values.recipeId : undefined
            }).unwrap();
            message.success('Лекарство успешно добавлено');
            form.resetFields();
            setType('');
            onSuccess?.();
        } catch (error) {
            message.error('Ошибка при добавлении лекарства');
            console.error('Ошибка при добавлении лекарства:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Добавить новое лекарство</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className={styles.form}
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
                    <Select placeholder="Выберите тип" onChange={setType} allowClear>
                        <Select.Option value="ready">Готовое</Select.Option>
                        <Select.Option value="manufacturable">Приготавливаемое</Select.Option>
                    </Select>
                </Form.Item>

                {type === 'manufacturable' && (
                    <Form.Item
                        name="recipeId"
                        label="Рецепт"
                        rules={[{ required: true, message: 'Пожалуйста, выберите рецепт' }]}
                    >
                        <Select placeholder="Выберите рецепт">
                            {recipes?.map(recipe => (
                                <Select.Option key={recipe.id} value={recipe.id}>{recipe.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

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
                        Добавить лекарство
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}; 