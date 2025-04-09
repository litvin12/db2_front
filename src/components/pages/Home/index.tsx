import React from 'react';
import { setShowModal } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ProductCard } from '../../ProductCard';
import { Search } from '../../Search';
import { Sort } from '../../Sort';
import { SelectRole } from '../../SelectRole';
import styles from './styles.module.scss';
export const Home = () => {
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);

    const onClickClose = () => 
        {
            dispatch(setShowModal(false));
        }
    return (
        <div className={styles.containerHome}>
            {showModal && 
            <SelectRole
            onClickClose={onClickClose}
        />}
            
            <div className={styles.filters}>
                <Search></Search>
                <Sort></Sort>
            </div>

            <div className={styles.content}>
            <div className={styles.item}>
            <ProductCard></ProductCard>
            </div>
            </div>
        </div>
    );
}