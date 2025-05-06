import styles from './styles.module.scss'
import { getOrder, medicines } from '../../../redux/api';
import { useEditOrderStatusMutation } from '../../../redux/api';
const statuses = ['Ожидает получения', 'Готов к приготовлению'];
const types = ['Готовый', 'Приготовляемое'];
type props = {
    data: getOrder[];
    medicines: medicines[];
}
export const OrdersAdm = ({ data, medicines }: props) => {
    const [editOrderStatus] = useEditOrderStatusMutation();
    return (
        <div className={styles.content}>
            {data.map(order => {
                const medicine = medicines.find(med => med.id === order.medicineId);
                return (
                    <div key={order.id} className={styles.component}>
                        <h4 className={styles.name}>
                            {medicine?.name || `Not found (id: ${order.medicineId})`}
                        </h4>
                        <span className={styles.type}>{order.type === 'ready' ? types[0] : types[1]}</span>
                        <span className={styles.status}>
                            {order.status === 'waiting_for_receive' && statuses[0]}
                            {order.status === 'ready_to_preparation' && statuses[1]}
                        </span>
                        {order.status === 'ready_to_preparation' && <button className={styles.button} onClick={() => editOrderStatus({ id: order.id, status: 'waiting_for_receive', type: order.type })}>Приготовлено</button>}
                        <button className={styles.buttonReady} onClick={() => editOrderStatus({ id: order.id, status: 'ready_to_preparation', type: order.type })}>Отмена приготовления</button>
                    </div>
                );

            })}
        </div>
    );
}