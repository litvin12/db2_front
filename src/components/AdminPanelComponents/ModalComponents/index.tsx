import styles from './styles.module.scss';
import { useGetRecipeComponentsQuery } from '../../../redux/api';
export type ModalComponentsProps = {
    onClickClose: () => void;
    recipeId: number | null;
}
export const ModalComponents = ({ onClickClose, recipeId }: ModalComponentsProps) => {
    const { data } = useGetRecipeComponentsQuery();
    console.log(recipeId);
    return (
        <div className={styles.overlay1}>
            <div className={styles.modal}>
                <div className={styles.buttonControl}>
                    <button className={styles.buttonClose} onClick={onClickClose}>Закрыть</button>
                </div>
                <div className={styles.listOfComponents}>
                    {data
                        ?.filter(component => component.recipeId === recipeId)
                        .map(component => (
                            <div key={component.id} className={styles.component}>
                                <span>Номер компонента: {component.componentId}</span>
                                <span>Количество: {component.quantityNeeded}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
