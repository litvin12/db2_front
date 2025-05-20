import { FC } from 'react';
import styles from './styles.module.scss';
import { useGetWholesaleBatchIDQuery } from '../../../redux/api';
interface ModalBatchProps {
    isOpen: boolean;
    onClose: () => void;
    batchID: number;
}

export const ModalBatch: FC<ModalBatchProps> = ({ isOpen, onClose, batchID }) => {
    if (!isOpen || !batchID) return null;
    const { data: wholesaleBatch } = useGetWholesaleBatchIDQuery(batchID);
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Детали заказа</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.modalBody}>
                    {wholesaleBatch?.map(item => (
                        <div className={styles.component}>
                            <span className={styles.name}>{item.medicineName}</span>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <span className={styles.price}>{item.wholesaleOrderStatus === 'pending' ? 'Ожидается' : item.wholesaleOrderStatus === 'placed' ? 'Размещен' : item.wholesaleOrderStatus === 'arrived' ? 'Доставлен' : 'Такого статуса нет'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
