import { setShowModal } from '../../../redux/userSlice';
import { setShowModalProfile } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ProductCard } from '../../ProductCard';
import { Search } from '../../Search';
import { Sort } from '../../Sort';
import { SelectRole } from '../../SelectRole';
import { Profile } from '../Profile';
import { useGetMedicinesQuery } from '../../../redux/api';
import styles from './styles.module.scss';
import { AnimatePresence } from 'framer-motion'
export const Home = () => {
    const { data } = useGetMedicinesQuery();
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const { showModalProfile } = useSelector((state: RootState) => state.user);
    const onClickClose = () => {
        dispatch(setShowModal(false));
    }
    const onClickCloseProfile = () => {
        dispatch(setShowModalProfile(false));
    }
    return (
        <div className={styles.containerHome}>

            {showModal &&
                <SelectRole
                    onClickClose={onClickClose}
                />}
            <AnimatePresence>

            </AnimatePresence>

            <div className={styles.filters}>
                <Search></Search>
                <Sort></Sort>
            </div>

            <div className={styles.content}>
                {data?.map(item => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        quantity={item.quantity}
                        price={item.price} />
                ))}
            </div>
        </div>
    );
}