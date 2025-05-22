import { useEffect } from 'react';
import { useEditWholesaleOrderMutation } from '../../../redux/api';
import styles from './styles.module.scss';
import { Form, InputNumber, Select, Button, message } from 'antd';

interface EditWholesaleOrderForm {
    quantity: number;
    status: string;
}

interface EditWholesaleOrderProps {
    initialValues: EditWholesaleOrderForm & { id: number };
    onSuccess?: () => void;
}

const statusOptions = [
    { value: 'pending', label: 'Ожидается' },
    { value: 'placed', label: 'Размещен' },
    { value: 'arrived', label: 'Доставлен' },
];

export const EditWholesaleOrder = ({ initialValues, onSuccess }: EditWholesaleOrderProps) => {
    const [form] = Form.useForm();
    const [editWholesaleOrder] = useEditWholesaleOrderMutation();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const onFinish = async (values: EditWholesaleOrderForm) => {
        try {
            await editWholesaleOrder({
                id: initialValues.id,
                quantity: values.quantity,
                status: values.status
            }).unwrap();
            message.success('Оптовый заказ успешно обновлен');
            onSuccess?.();
        } catch (error) {
            message.error('Ошибка при обновлении оптового заказа');
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
                    name="quantity"
                    label="Количество"
                    rules={[{ required: true, message: 'Пожалуйста, введите количество' }]}
                >
                    <InputNumber min={1} placeholder="Введите количество" />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Статус"
                    rules={[{ required: true, message: 'Пожалуйста, выберите статус' }]}
                >
                    <Select placeholder="Выберите статус">
                        {statusOptions.map(opt => (
                            <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
                        ))}
                    </Select>
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