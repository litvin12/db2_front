import styles from './styles.module.scss';
import { useGetMedicinesQuery } from '../../../redux/api';
export const Product = () => {
    const { data } = useGetMedicinesQuery();
    console.log(data);
    return (
        <div className={styles.container}>
            {data?.map(item => (
                <div className={styles.component}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <span className={styles.price}>{item.price}</span>
                </div>
            ))}
        </div>
    );
}
