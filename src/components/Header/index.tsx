import { setShowModal } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';
import { div } from 'framer-motion/client';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const onClickProfile = () => {
        dispatch(setShowModal(true));
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