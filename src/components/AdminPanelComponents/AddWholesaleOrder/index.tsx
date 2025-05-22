import { useAddWholeSaleOrderMutation, useGetMedicinesQuery } from '../../../redux/api';
import styles from './styles.module.scss';
import { Form, InputNumber, Select, Button, message } from 'antd';
import { useEffect } from 'react';

interface AddWholesaleOrderForm {
    medicineId: number;
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface AddWholesaleOrderProps {
    onSuccess?: () => void;
    initialValues?: Partial<AddWholesaleOrderForm>;
}

const statusOptions = [
    { value: 'pending', label: 'Ожидается' },
    { value: 'placed', label: 'Размещен' },
    { value: 'arrived', label: 'Доставлен' },
];

export const AddWholesaleOrder = ({ onSuccess, initialValues }: AddWholesaleOrderProps) => {
    const [form] = Form.useForm();
    const [addWholesaleOrder] = useAddWholeSaleOrderMutation();
    const { data: medicines } = useGetMedicinesQuery();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const onFinish = async (values: AddWholesaleOrderForm) => {
        try {
            await addWholesaleOrder({
                ...values,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }).unwrap();
            message.success('Оптовый заказ успешно добавлен');
            onSuccess?.();
            form.resetFields();
        } catch (error) {
            message.error('Ошибка при добавлении оптового заказа');
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
                    name="medicineId"
                    label="Лекарство"
                    rules={[{ required: true, message: 'Пожалуйста, выберите лекарство' }]}
                >
                    <Select placeholder="Выберите лекарство">
                        {medicines?.map(med => (
                            <Select.Option key={med.id} value={med.id}>{med.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
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
                        Добавить заказ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}; 