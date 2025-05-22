import React from 'react';
import styles from './styles.module.scss';
import { useGetUserQuery, useSetRoleMutation, useSetRoleExitMutation } from '../../redux/api';
import { user } from '../../redux/api';
import { AuthorizationSucces } from '../AuthorizationSucces';
const roleList = ["Пользователь", "Фармацевт", "Админ"]

type propsModal = {
    onClickClose: () => void;
}

// Определяем тип user из API


export const SelectRole = ({ onClickClose }: propsModal) => {
    const [userRole, setUserRole] = React.useState<user[]>([]);
    const [selectedRole, setSelectedRole] = React.useState(false);
    const [showSucces, setShowSucces] = React.useState(false);
    const { data, isLoading } = useGetUserQuery();
    const [setRole] = useSetRoleMutation();
    const [setRoleExit] = useSetRoleExitMutation();
    const onClickSignIn = (user: user) => {
        localStorage.setItem('user', JSON.stringify(user));
        const user1 = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        setRole({ role: user1.role });
        setShowSucces(true);
    }
    return (
        <div className={styles.overlay1}>
            <div className={styles.modal}>
                <div className={styles.buttonControl}>
                    {selectedRole && <button className={styles.buttonBack} onClick={() => setSelectedRole(false)}>Назад</button>}
                    <button className={styles.buttonClose} onClick={onClickClose}>Закрыть</button>
                </div>
                <h1 className={styles.select}>Выберите профиль</h1>
                <div className={styles.selectedRole}>
                    {selectedRole ?
                        userRole.map(user => (
                            <li key={user.id}
                                onClick={() => onClickSignIn(user)}>{
                                    user.firstName
                                }</li>
                        ))
                        :
                        roleList.map(role => (

                            <li key={role} onClick={() => {
                                if (role === 'Пользователь') {
                                    setUserRole(data?.filter(user => user.role === 'customer') || []);
                                }
                                else if (role === 'Админ') {
                                    setUserRole(data?.filter(user => user.role === 'admin') || []);
                                }
                                else if (role === 'Фармацевт') {
                                    setUserRole(data?.filter(user => user.role === 'pharmacist') || []);
                                }
                                setSelectedRole(true);
                            }}>
                                {role}
                            </li>
                        ))
                    }
                </div>
                {showSucces && <AuthorizationSucces
                    onClickClose={(onClickClose)}
                />}
            </div>
        </div>
    )
}