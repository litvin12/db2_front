import { ProductCard } from '../../ProductCard';
import { Search } from '../../Search';
import { Sort } from '../../Sort';
import styles from './styles.module.scss';
export const Home = () => {
    return (
        <div className={styles.containerHome}>
            <div className={styles.filters}>
                <Search></Search>
                <Sort></Sort>
            </div>

            <div className={styles.content}>
            <div className={styles.item}>
                    <ProductCard></ProductCard>
            </div>
            </div>
        </div>
    );
}