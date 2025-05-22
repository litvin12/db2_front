import styles from './styles.module.scss';
import { useGetWholeSaleOrdersQuery, useGetMedicinesQuery, useAddWholesaleBatchMutation, useDeleteWholesaleOrderMutation, useEditWholesaleOrderMutation } from '../../../redux/api';
import { Medicine } from '../../../types/medicine';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Button, message, Modal } from 'antd';
import { useState } from 'react';
import { EditWholesaleOrder } from '../EditWholesaleOrder';
import { AddWholesaleOrder } from '../AddWholesaleOrder';
const listOfStatuses = ['ready_to_preparation', 'preparing', 'waiting_for_receive', 'waiting_for_stock', 'completed'];
export const CurrentOrder = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const { data: orders } = useGetWholeSaleOrdersQuery();
    const { data: medicines } = useGetMedicinesQuery();
    const [addWholesaleBatch] = useAddWholesaleBatchMutation();
    const [deleteWholesaleOrder] = useDeleteWholesaleOrderMutation();
    const [editWholesaleOrder] = useEditWholesaleOrderMutation();
    const [editModal, setEditModal] = useState<{ open: boolean, order: any | null }>({ open: false, order: null });
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleDelete = async (id: number) => {
        try {
            await deleteWholesaleOrder({ id }).unwrap();
            message.success('Оптовый заказ удалён');
        } catch (error) {
            message.error('Ошибка при удалении заказа');
        }
    };

    const handleEdit = (order: any) => setEditModal({ open: true, order });
    const handleEditClose = () => setEditModal({ open: false, order: null });
    const handleAddOpen = () => setAddModalOpen(true);
    const handleAddClose = () => setAddModalOpen(false);

    return (
        <div className={styles.container}>
            {user?.role === 'admin' &&
                <>
                    <button onClick={handleAddOpen}>Добавить оптовый заказ</button>
                    <Modal
                        title="Добавить оптовый заказ"
                        open={addModalOpen}
                        onCancel={handleAddClose}
                        footer={null}
                        width={400}
                    >
                        <AddWholesaleOrder onSuccess={handleAddClose} />
                    </Modal>
                    <button onClick={() => addWholesaleBatch()}>Оформить заказ</button>
                </>
            }
            {orders?.map(item => (
                <div className={styles.component} key={item.id}>
                    <span className={styles.name}>Название: {medicines?.find((medicine: Medicine) => medicine.id === item.medicineId)?.name}</span>
                    <span className={styles.quantity}>Количество: {item.quantity}</span>
                    <span className={styles.price}>{item.status === 'pending' ? 'Ожидается' : item.status === 'placed' ? 'Размещен' : item.status === 'arrived' ? 'Доставлен' : 'Такого статуса нет'}</span>
                    {user?.role === 'admin' && (
                        <>
                            <Popconfirm
                                title="Удалить оптовый заказ?"
                                onConfirm={() => handleDelete(item.id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button danger size="small" icon={<DeleteOutlined />} style={{ marginLeft: '7px' }} />
                            </Popconfirm>
                            <Button
                                icon={<EditOutlined />}
                                size="small"
                                style={{ marginLeft: '7px' }}
                                onClick={() => handleEdit(item)}
                            />
                        </>
                    )}
                </div>
            ))}
            <Modal
                title="Редактировать оптовый заказ"
                open={editModal.open}
                onCancel={handleEditClose}
                footer={null}
                width={400}
            >
                {editModal.order && (
                    <EditWholesaleOrder initialValues={editModal.order} onSuccess={handleEditClose} />
                )}
            </Modal>
        </div>
    );
}
