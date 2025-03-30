import { Link } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export const Header = () => {
    return (
        <div className={styles.container}>
            <Link to='/'>
                <h1 className={styles.logo}>Аптека</h1>
            </Link>
            <div className={styles.dataBlock}>
                
                <Link to='/profile'>
                    <UserOutlined/>
                </Link>
                <ShoppingCartOutlined/>
            </div>
        </div>
    );
}