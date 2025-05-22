import styles from './styles.module.scss';
import { useGetMedicinesQuery, useGetOrdersUserQuery, useEditOrderStatusMutation } from '../../redux/api';
export const OrdersUser = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const { data } = useGetOrdersUserQuery(user.id);
    const { data: medicines } = useGetMedicinesQuery();
    const [editOrderStatus] = useEditOrderStatusMutation();
    console.log(data);
    return (
        <div className={styles.container}>
            {data?.map(item => (
                <div className={styles.component}>
                    <span className={styles.name}>{medicines?.find(medicine => medicine.id === item.medicineId)?.name}</span>
                    <span className={styles.date}>Дата: {new Date(item.createdAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    <span className={styles.type}>{item.type === 'manufacturable' ? 'Изготовливаемый' : 'Готовый'}</span>
                    <span className={styles.status}>{item.status === 'waiting_for_receive' ? 'Ожидает получения' : item.status === 'completed' ? 'Завершен' : item.status === 'preparing' ? 'Приготавливается' : item.status === 'waiting_for_stock' ? 'Ожидает поставки' : item.status === 'ready_to_preparation' ? 'Готов к приготовлению' : item.status}</span>
                    {item.status !== 'completed' && (
                        <button
                            className={styles.button}
                            onClick={() => editOrderStatus({ id: item.id, status: 'completed', type: item.type })}
                        >
                            Получил
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
