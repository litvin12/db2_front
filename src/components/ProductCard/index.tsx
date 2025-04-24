import styles from './styles.module.scss'
type ProductCardProps = {
    id: number,
    name: string,
    quantity: number
    price: number,
}
export const ProductCard = ({ id, name, quantity, price }: ProductCardProps) => {
    return ( 
        <div className={styles.containerCard}>
            <div className={styles.item}>
                <img className={styles.productImg} src="" alt="Картинка товара" />
                <div className={styles.descr}>
                    
                    <p className={styles.price}><span>{price}₽</span></p>
                    <h3 className={styles.title}>{name}
                    </h3>
                    <p className={styles.quantity}>В наличии <span>{quantity}</span></p>
                    <button>Купить</button>
                </div>
        </div>
        </div>
    );
}