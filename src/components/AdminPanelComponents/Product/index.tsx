import styles from './styles.module.scss';
import { useGetMedicinesQuery, useDeleteMedicineMutation } from '../../../redux/api';
import { AddMedicine } from '../AddMedicine';
import { EditMedicine } from '../EditMedicine';
import { Button, Modal, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Product = () => {
    const { data } = useGetMedicinesQuery();
    const [deleteMedicine] = useDeleteMedicineMutation();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const isAdmin = user?.role === 'admin';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState<{ open: boolean, medicine: any | null }>({ open: false, medicine: null });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteMedicine({ id }).unwrap();
            message.success('Лекарство удалено');
        } catch (error) {
            message.error('Ошибка при удалении');
        }
    };

    const handleEdit = (medicine: any) => {
        setEditModal({ open: true, medicine });
    };

    const handleEditClose = () => {
        setEditModal({ open: false, medicine: null });
    };

    return (
        <div className={styles.container}>
            {isAdmin && (
                <div className={styles.header}>
                    <Button type="primary" onClick={showModal} style={{ margin: '0', backgroundColor: 'white', color: 'black' }}>
                        Добавить лекарство
                    </Button>
                    <Modal
                        title="Добавить новое лекарство"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        <AddMedicine onSuccess={handleCancel} />
                    </Modal>
                    <Modal
                        title="Редактировать лекарство"
                        open={editModal.open}
                        onCancel={handleEditClose}
                        footer={null}
                        width={600}
                    >
                        {editModal.medicine && (
                            <EditMedicine initialValues={editModal.medicine} onSuccess={handleEditClose} />
                        )}
                    </Modal>
                </div>
            )}
            <div className={styles.productsList}>
                {data?.map(item => (
                    <div key={item.id} className={styles.component}>
                        <span className={styles.name}>{item.name}</span>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <span className={styles.price}>{item.price}</span>
                        {isAdmin && (
                            <Space>
                                <Button
                                    icon={<EditOutlined />}
                                    size="small"
                                    onClick={() => handleEdit(item)}
                                />
                                <Popconfirm
                                    title="Удалить лекарство?"
                                    onConfirm={() => handleDelete(item.id)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <Button danger size="small" icon={<DeleteOutlined />} />
                                </Popconfirm>
                            </Space>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
