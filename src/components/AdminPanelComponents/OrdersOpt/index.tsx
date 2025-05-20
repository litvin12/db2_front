import { useState } from 'react';
import styles from './styles.module.scss';
import { useGetWhosaleBatchQuery, useEditStatusBatchMutation } from '../../../redux/api';

import { ModalBatch } from '../ModalBatch';

export const OrdersOpt = () => {
    const [id, setId] = useState<number>(2);
    const { data } = useGetWhosaleBatchQuery();
    const [editStatusBatch] = useEditStatusBatchMutation();
    // Корректная проверка роли пользователя
    let isAdmin = false;
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            isAdmin = user.role === 'admin';
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
