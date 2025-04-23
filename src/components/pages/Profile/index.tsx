import React from 'react';
import styles from './styles.module.scss';
import { useGetUserQuery } from '../../../redux/api';
import { user } from '../../../redux/api';
const roleList = ["Пользователь", "Фармацевт"]

type propsModal = {
    onClickClose: () => void;
}



export const SelectRole = ({ onClickClose }: propsModal) => {
    const [userRole, setUserRole] = React.useState<user[]>([]);
    const [selectedRole, setSelectedRole] = React.useState(false);
    const { data, isLoading } = useGetUserQuery();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.buttonControl}>
                {selectedRole && <button className={styles.buttonBack} onClick={() => setSelectedRole(false)}>Назад</button>}
                    <button className={styles.buttonClose} onClick={onClickClose}>Закрыть</button>
                </div>
                <h1 className={styles.select}>Ваш профиль</h1>
                <div className={styles.selectedRole}>
                    {selectedRole ? 
                    userRole.map(user => (
                        <li key={user.id}
                        onClick={() => {
                            localStorage.setItem('user', JSON.stringify(user));
                            console.log('Сохранено:', JSON.parse(localStorage.getItem('user') || '{}'));
                            onClickClose();
                        }}>{
                            user.firstName
                        }</li>
                    ))
                    :
                    roleList.map(role => (
                        
                        <li key={role} onClick={() => {
                            if (role === 'Пользователь') {
                                setUserRole(data?.filter(user => user.role === 'user') || []);
                            }
                            else {
                                setUserRole(data?.filter(user => user.role === 'admin') || []);
                            }
                            setSelectedRole(true);
                        }}>
                            {role}  
                        </li>
                    ))
                }
                </div>
                
            </div>
        </div>
    )
}