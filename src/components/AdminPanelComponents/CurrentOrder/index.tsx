import styles from './styles.module.scss';
import { useGetWholeSaleOrdersQuery, useGetMedicinesQuery, useAddWholesaleBatchMutation } from '../../../redux/api';
import { Medicine } from '../../../types/medicine';
const listOfStatuses = ['ready_to_preparation', 'preparing', 'waiting_for_receive', 'waiting_for_stock', 'completed'];
export const CurrentOrder = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const { data: orders } = useGetWholeSaleOrdersQuery();
    const { data: medicines } = useGetMedicinesQuery();
    const [addWholesaleBatch] = useAddWholesaleBatchMutation();
    return (
        <div className={styles.container}>
            {user?.role === 'admin' &&
                <button onClick={() => addWholesaleBatch()}>Оформить заказ</button>
            }
            {orders?.map(item => (
                <div className={styles.component}>
                    <span className={styles.name}>Название: {medicines?.find((medicine: Medicine) => medicine.id === item.medicineId)?.name}</span>
                    <span className={styles.quantity}>Количество: {item.quantity}</span>
                    <span className={styles.price}>{item.status === 'pending' ? 'Ожидается' : item.status === 'placed' ? 'Размещен' : item.status === 'arrived' ? 'Доставлен' : 'Такого статуса нет'}</span>
                </div>
            ))}
        </div>
    );
}
