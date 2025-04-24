import React from 'react';
import styles from './styles.module.scss';
import { useGetUserQuery } from '../../../redux/api';
import { user } from '../../../redux/api';

const roleList = ["Пользователь", "Фармацевт"]

type propsModal = {
    onClickClose: () => void;
}



export const Profile = ({ onClickClose }: propsModal) => {
    const [userData, setUserData] = React.useState<user | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
}, []);
    const onClickExit = () => {
        localStorage.removeItem('user');
        onClickClose();
    }
    return (
        <div className={styles.overlay1}>
            <div className={styles.modal}>
                <div className={styles.buttonControl}>
                    <button className={styles.buttonClose} onClick={onClickClose}>Закрыть</button>
                </div>
                <h1 className={styles.select}>Ваш профиль</h1>
                <div className={styles.userData}>
                    <span>Имя: {userData?.firstName}</span>
                    <span>Фамилия: {userData?.secondName}</span>
                    <span>Роль: {userData?.role}</span>
                </div>
                <button className={styles.exit} onClick={onClickExit}>Выйти</button>
            </div>
        </div>
    )
}