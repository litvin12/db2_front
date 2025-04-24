import { setShowModal } from '../../redux/userSlice';
import { setShowModalProfile } from '../../redux/userSlice';
import { Profile } from '../pages/Profile'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const onClickProfile = () => {
        dispatch(setShowModal(true));
    }
    const onClickProfile2 = () => {
        dispatch(setShowModalProfile(true));
    }
    return (
        <div className={styles.container}>
            <Link to='/'>
                <h1 className={styles.logo}>Аптека</h1>
            </Link>
            <div className={styles.dataBlock}>
                
                    <UserOutlined
                    onClick={localStorage.getItem('user') === null ? onClickProfile : onClickProfile2}/>
                <ShoppingCartOutlined/>
            </div>
        </div>
    );
}