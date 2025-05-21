import styles from './styles.module.scss';
import { useGetWholeSaleOrdersQuery, useGetMedicinesQuery, useAddWholesaleBatchMutation, useDeleteWholesaleOrderMutation } from '../../../redux/api';
import { Medicine } from '../../../types/medicine';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Button, message } from 'antd';
const listOfStatuses = ['ready_to_preparation', 'preparing', 'waiting_for_receive', 'waiting_for_stock', 'completed'];
export const CurrentOrder = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const { data: orders } = useGetWholeSaleOrdersQuery();
    const { data: medicines } = useGetMedicinesQuery();
    const [addWholesaleBatch] = useAddWholesaleBatchMutation();
    const [deleteWholesaleOrder] = useDeleteWholesaleOrderMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteWholesaleOrder(id).unwrap();
            message.success('Оптовый заказ удалён');
        } catch (error) {
            message.error('Ошибка при удалении заказа');
        }
    };

    return (
        <div className={styles.container}>
            {user?.role === 'admin' &&
                <button onClick={() => addWholesaleBatch()}>Оформить заказ</button>
            }
            {orders?.map(item => (
                <div className={styles.component} key={item.id}>
                    <span className={styles.name}>Название: {medicines?.find((medicine: Medicine) => medicine.id === item.medicineId)?.name}</span>
                    <span className={styles.quantity}>Количество: {item.quantity}</span>
                    <span className={styles.price}>{item.status === 'pending' ? 'Ожидается' : item.status === 'placed' ? 'Размещен' : item.status === 'arrived' ? 'Доставлен' : 'Такого статуса нет'}</span>
                    {user?.role === 'admin' && (
                        <Popconfirm
                            title="Удалить оптовый заказ?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button danger size="small" icon={<DeleteOutlined />} style={{ marginLeft: '7px' }} />
                        </Popconfirm>
                    )}
                </div>
            ))}
        </div>
    );
}
