import React from 'react';
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
export const Home = () => {
    const { data } = useGetMedicinesQuery();
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const { showModalProfile } = useSelector((state: RootState) => state.user);
    const onClickClose = () => 
        {
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
        {showModalProfile && 
            <Profile
            onClickClose={onClickCloseProfile}
        />}

            
            <div className={styles.filters}>
                <Search></Search>
                <Sort></Sort>
            </div>

            <div className={styles.content}>
            {data?.map(item => (
                <div className={styles.item}>
                    <ProductCard 
                    id={item.id} 
                    name={item.name} 
                    quantity={item.quantity}
                    price={item.price}/>
                </div>
            ))}
            </div>
        </div>
    );
}