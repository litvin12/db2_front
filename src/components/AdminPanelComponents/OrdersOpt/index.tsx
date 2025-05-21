import { useState } from 'react';
import styles from './styles.module.scss';
import { useGetWhosaleBatchQuery, useEditStatusBatchMutation, useDeleteWholesaleOrderMutation, useDeleteWholesaleBatchMutation } from '../../../redux/api';
import { ModalBatch } from '../ModalBatch';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Button, message } from 'antd';

export const OrdersOpt = () => {
    const [id, setId] = useState<number>(2);
    const { data } = useGetWhosaleBatchQuery();
    const [editStatusBatch] = useEditStatusBatchMutation();
    const [deleteWholesaleOrder] = useDeleteWholesaleOrderMutation();
    const [deleteWholesaleBatch] = useDeleteWholesaleBatchMutation();
    // Корректная проверка роли пользователя
    let isAdmin = false;
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            isAdmin = user.role === 'admin' || user.role === 'pharmacist';
        } catch (e) {
            isAdmin = false;
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    // Сохраняем статусы для каждого заказа локально
    const [statuses, setStatuses] = useState<Record<number, string>>({});

    const handleOrderClick = (id: number) => {
        setId(id);
        setIsModalOpen(true);
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        setStatuses(prev => ({ ...prev, [orderId]: newStatus }));
        try {
            await editStatusBatch({ id: orderId, status: newStatus }).unwrap();
        } catch (e) {
            // Можно добавить обработку ошибки
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteWholesaleOrder(id).unwrap();
            message.success('Оптовый заказ удалён');
        } catch (error) {
            message.error('Ошибка при удалении заказа');
        }
    };

    const handleDeleteBatch = async (id: number) => {
        try {
            await deleteWholesaleBatch(id).unwrap();
            message.success('Партия удалена');
        } catch (error) {
            message.error('Ошибка при удалении партии');
        }
    };

    return (
        <div className={styles.container}>
            {data?.map(item => (
                <div
                    key={item.id}
                    className={styles.component}
                    onClick={() => handleOrderClick(item.id)}
                >
                    <span>Номер батча: {item.id}</span>

                    <span className={styles.name}>
                        Дата: {new Date(item.createdAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <select
                        className={styles.price}
                        value={statuses[item.id] ?? item.status}
                        onChange={e => handleStatusChange(item.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                        disabled={!isAdmin}
                    >
                        <option value="placed">Размещен</option>
                        <option value="arrived">Доставлен</option>
                    </select>
                    {isAdmin && (
                        <Popconfirm
                            title="Удалить партию?"
                            onConfirm={e => { e && e.stopPropagation(); handleDeleteBatch(item.id); }}
                            okText="Да"
                            cancelText="Нет"
                            onCancel={e => e && e.stopPropagation()}
                        >
                            <Button
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={e => e.stopPropagation()}
                            />
                        </Popconfirm>
                    )}
                </div>
            ))}

            <ModalBatch
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                batchID={id}
            />
        </div>
    );
}
