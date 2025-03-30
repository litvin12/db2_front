import styles from './styles.module.scss'
export const ProductCard = () => {
    return (
        <div className={styles.containerCard}>
            <div className={styles.item}>
                <img className={styles.productImg} src="https://12bb6ecf-bda5-4c99-816b-12bda79f6bd9.selcdn.net/upload//Photo_Tovar/35328603_1712831109.jpg" alt="Картинка товара" />
                <div className={styles.descr}>
                    
                    <p><span>От 616₽</span></p>
                    <h3 className={styles.title}>Канефрон Н таб 60 шт
                    </h3>
                    <p>В наличии</p>
                    <button>Купить</button>
                </div>
        </div>
        <div className={styles.item}>
                <img className={styles.productImg} src="https://12bb6ecf-bda5-4c99-816b-12bda79f6bd9.selcdn.net/upload//Photo_Tovar/35328603_1712831109.jpg" alt="Картинка товара" />
                <div className={styles.descr}>
                    
                    <p><span>От 616</span></p>
                    <h3 className={styles.title}>Канефрон Н таб 60 шт
                    </h3>
                    <p>В наличии</p>
                    <button>Купить</button>
                </div>
        </div><div className={styles.item}>
                <img className={styles.productImg} src="https://12bb6ecf-bda5-4c99-816b-12bda79f6bd9.selcdn.net/upload//Photo_Tovar/35328603_1712831109.jpg" alt="Картинка товара" />
                <div className={styles.descr}>
                    
                    <p><span>От 616</span></p>
                    <h3 className={styles.title}>Канефрон Н таб 60 шт
                    </h3>
                    <p>В наличии</p>
                    <button>Купить</button>
                </div>
        </div>
        </div>
    );
}