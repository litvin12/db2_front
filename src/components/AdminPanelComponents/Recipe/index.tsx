import styles from './styles.module.scss';
import { useGetRecipeQuery } from '../../../redux/api';

export const Recipe = () => {
    const { data } = useGetRecipeQuery();
    return (
        <div className={styles.content}>
            {data?.map(recipe => (
                <div key={recipe.id} className={styles.component}>
                    <div className={styles.preparationTime}>
                        <span>Время приготовления:</span>
                        <span>{recipe.preparationTime}</span>
                    </div>
                    <div className={styles.technology}>
                        <span>Технология приготовления:</span>
                        <span>{recipe.technology}</span>
                    </div>
                    <button>Компоненты</button>
                </div>
            ))}
        </div>
    );
}
