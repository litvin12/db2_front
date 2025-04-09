import React from 'react';
import styles from './styles.module.scss';
import { setShowModal } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const roleList = ["Пользователь", "Фармацевт"]

type propsModal = {
    onClickClose: () => void;
}
export const SelectRole = ({ onClickClose }: propsModal) => {
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onClickClose}>Закрыть</button>
                <h1 className={styles.select}>Выберите роль</h1>
                <div className={styles.selectedRole}>
                    {roleList.map(role => <li>{role}</li>)}
                </div>
            </div>
        </div>
    )
}