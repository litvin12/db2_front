import { setShowModal } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { useState } from 'react';

import styles from './styles.module.scss';
import { div } from 'framer-motion/client';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const [isSpinning, setIsSpinning] = useState(false);

    const onClickProfile = () => {
        dispatch(setShowModal(true));
    }

    const toggleSpin = () => {
        const newSpinningState = !isSpinning;
        setIsSpinning(newSpinningState);
        localStorage.setItem('isSpinning', String(newSpinningState));
        // Триггерим событие storage для обновления состояния в App.tsx
        window.dispatchEvent(new Event('storage'));
    }

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const handleUserClick = () => {
        if (localStorage.getItem('user') === null) {
            dispatch(setShowModal(true));
        } else {
            navigate('/profile');
        }
    }
    return (
        <div className={styles.container}>
            <Link className={styles.link} to='/'>
                <h1 className={styles.logo}>Аптека</h1>
            </Link>
            <div className={styles.dataBlock}>
                <SyncOutlined
                    spin={isSpinning}
                    onClick={toggleSpin}
                    className={styles.spinButton}
                    style={{ fontSize: 24, marginRight: 9 }}
                />
                <UserOutlined
                    onClick={handleUserClick} />

                {(user?.role === 'admin' || user?.role === 'pharmacist') &&
                    <Link to='/admin-panel'>
                        <SettingOutlined className={styles.adminPanel} style={{ fontSize: 24, marginLeft: 9 }} />
                    </Link>
                }
            </div>
        </div>
    );
}