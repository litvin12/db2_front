import React from 'react';
import styles from './styles.module.scss';
import { user } from '../../../redux/api';
import { useNavigate } from 'react-router-dom';
import { div, h1 } from 'framer-motion/client';

const menuItems = [
    'Мой профиль',
    'Мои заказы'
]
export const Profile = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = React.useState<user | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>('Мой профиль');
    const currentUser = localStorage.getItem('user');
    const CurrentUserData = currentUser ? JSON.parse(currentUser) : null;
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);
    const onClickExit = () => {
        localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <div className={styles.containerProfile}>
            <div className={styles.containerModal}>
                <div className={styles.more}>
                    <div className={styles.karouselBlock}>
                        {menuItems.map(item => (
                            <div onClick={() => setSelectedMenuItem(item)} className={`${styles.karousel} ${selectedMenuItem === item ? styles.selected : ''}`} key={item}>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    {selectedMenuItem === 'Мой профиль' ?
                        <div className={styles.modal}>
                            <h1 className={styles.select}>Ваш профиль</h1>
                            <div className={styles.userData}>
                                <span>Имя: {userData?.firstName}</span>
                                <span>Фамилия: {userData?.secondName}</span>
                                <span>Роль: {userData?.role}</span>
                            </div>
                        </div>
                        :
                        <div>
                            <h1>Мои заказы</h1>
                        </div>
                    }
                    {CurrentUserData.role === 'admin' &&
                        <div>111</div>}
                </div>
                <button className={styles.exit} onClick={onClickExit}>Выйти</button>
            </div>
        </div>
    )
}