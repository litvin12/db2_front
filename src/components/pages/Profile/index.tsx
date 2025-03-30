import { Authorization } from '../../Authorization';
import styles from './styles.module.scss'
export const Profile = () => {
   

    return (
        <div className={styles.containerProfile}>
            <Authorization/>
        </div>
    );
}