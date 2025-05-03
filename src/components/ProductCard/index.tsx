import styles from './styles.module.scss'
import { useAddOrderMutation } from '../../redux/api'

type ProductCardProps = {
    id: number,
    name: string,
    type: string,
    quantity: number
    price: number,
}
export const ProductCard = ({ id, name, type, quantity, price }: ProductCardProps) => {
    const [addOrder] = useAddOrderMutation();
    const checkAuth = () => {
        if (localStorage.getItem('user')) {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
            return user;
        }
    }

    const onClickOrder = async () => {
        console.log(checkAuth()?.id, id);

        try {
            await addOrder({
                customerId: Number(checkAuth()?.id),
                medicineId: Number(id)
            })
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
        }
    }
    return (
        <div className={styles.item}>
            <img className={styles.productImg} src="" alt="Картинка товара" />
            <div className={styles.descr}>

                <p className={styles.price}><span>{price}₽</span></p>
                <h3 className={styles.title}>{name}
                </h3>
                <span className={styles.type}>{type === 'manufacturable' ? 'Приготавливаемое' : 'Готовое'}</span>
                <p className={styles.quantity}>В наличии <span>{quantity}</span></p>
                <button onClick={onClickOrder}>Купить</button>
            </div>
        </div>
    );
}