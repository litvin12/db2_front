import { setShowModal } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ProductCard } from '../../ProductCard';
import { Search } from '../../Search';
import { Sort } from '../../Sort';
import { SelectRole } from '../../SelectRole';
import { useGetMedicinesQuery, useGetWholeSaleOrdersQuery } from '../../../redux/api';
import styles from './styles.module.scss';
import { AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react';
import { Checkbox } from 'antd';


export const Home = () => {
    const { data } = useGetMedicinesQuery();
    const dispatch = useDispatch();
    const { showModal } = useSelector((state: RootState) => state.user);
    const { data: orders } = useGetWholeSaleOrdersQuery();
    console.log(orders);
    const [isChecked, setIsChecked] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortChange = (value: string) => {
        if (value === 'Сначала дешевле') setSortOrder('asc');
        else if (value === 'Сначала дороже') setSortOrder('desc');
    };

    useEffect(() => {
        handleSortChange('Сначала дешевле');
    }, []);

    const filteredAndSortedData = useMemo(() => {
        if (!data) return [];
        let arr = [...data];
        if (isChecked) {
            arr = arr.filter(item => item.type === 'manufacturable');
        }
        if (sortOrder === 'asc') {
            arr.sort((a, b) => a.price - b.price);
        } else {
            arr.sort((a, b) => b.price - a.price);
        }
        return arr;
    }, [data, sortOrder, isChecked]);

    const onClickClose = () => {
        dispatch(setShowModal(false));
    }


    return (
        <div className={styles.containerHome}>

            {showModal && localStorage.getItem('user') === null &&
                <SelectRole
                    onClickClose={onClickClose}
                />}
            <AnimatePresence>

            </AnimatePresence>

            <div className={styles.filters}>
                <Search></Search>
                <Sort onChange={handleSortChange} />
                <div className={styles.filters__buttons}>
                    <Checkbox
                        checked={isChecked}
                        onChange={e => setIsChecked(e.target.checked)}
                    >
                        Приготавливаемое
                    </Checkbox>
                </div>
            </div>

            <div className={styles.content}>
                {filteredAndSortedData.map(item => (
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