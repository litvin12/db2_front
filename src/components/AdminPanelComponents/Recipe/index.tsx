import React from 'react';
import styles from './styles.module.scss';
import { useGetRecipeQuery } from '../../../redux/api';
import { ModalComponents } from '../ModalComponents';
export const Recipe = () => {
    const [showModalComponents, setShowModalComponents] = React.useState(false);
    const { data } = useGetRecipeQuery();
    console.log(data);
    const [recipeId, setRecipeId] = React.useState<number | null>(null);
    const handleClick = (id: number) => {
        setRecipeId(id);
        setShowModalComponents(true);
    }
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
                    <button onClick={() => handleClick(recipe.id)}>Компоненты</button>
                </div>
            ))}
            {showModalComponents && <ModalComponents
                onClickClose={() => setShowModalComponents(false)}
                recipeId={recipeId}
            />}
        </div>
    );
}
