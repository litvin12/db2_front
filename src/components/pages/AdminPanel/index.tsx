import React from 'react';

import styles from './styles.module.scss';
import { useGetOrderQuery } from '../../../redux/api';
import { OrdersAdm } from '../../AdminPanelComponents/Orders';
import { useGetMedicinesQuery } from '../../../redux/api';
import { Recipe } from '../../AdminPanelComponents/Recipe';
import { Product } from '../../AdminPanelComponents/Product';
const menuItems = [
    'Заказы',
    'Рецепты',
    'Все товары',
    'Заказы на оптовый склад'
]
export const AdminPanel = () => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(menuItems[0]);
    const { data } = useGetOrderQuery();
    const { data: medicines } = useGetMedicinesQuery();
    return (
        <div className={styles.containerAdmin}>
            <div className={styles.content}>
                <div className={styles.menu}>
                    {menuItems.map((item, i) => (
                        <div
                            className={`${styles.carousel} ${selectedMenuItem === item ? styles.selected : ''}`}
                            key={i}
                            onClick={() => setSelectedMenuItem(item)}>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.content2}></div>
                {selectedMenuItem === 'Заказы' ?
                    <OrdersAdm data={data ?? []} medicines={medicines ?? []} />
                    :
                    selectedMenuItem === 'Рецепты' ?
                        <Recipe />
                        :
                        selectedMenuItem === 'Все товары' ?
                            <Product />
                            :
                            selectedMenuItem === 'Заказы на оптовый склад' ?
                                <div>444</div>
                                :
                                <div>Такого пункта нет</div>
                }

            </div>
        </div>
    );
}
