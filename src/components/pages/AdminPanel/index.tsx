import React from 'react';

import styles from './styles.module.scss';
import { useGetOrderQuery } from '../../../redux/api';
import { OrdersAdm } from '../../AdminPanelComponents/Orders';
import { useGetMedicinesQuery } from '../../../redux/api';
import { Recipe } from '../../AdminPanelComponents/Recipe';
import { Product } from '../../AdminPanelComponents/Product';
import { OrdersOpt } from '../../AdminPanelComponents/OrdersOpt';
import { CurrentOrder } from '../../AdminPanelComponents/CurrentOrder';
const menuItems = [
    'Заказы',
    'Все товары',
    'Рецепты',
    'Заказы на оптовый склад',
    'Текущий заказ на склад'
]
//  'Заказы на оптовый склад(GET Batch, post batch)',
//     'Текущий заказ(GET WO, Sts pending) '
//При нажатии на батч открывается модалка с хуйордерс
export const AdminPanel = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
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
                <div className={styles.content2}>
                    {selectedMenuItem === 'Заказы' ?
                        <OrdersAdm data={data ?? []} medicines={medicines ?? []} />
                        :
                        selectedMenuItem === 'Все товары' ?
                            <Product />
                            :
                            selectedMenuItem === 'Заказы на оптовый склад' ?
                                <OrdersOpt />
                                :
                                selectedMenuItem === 'Рецепты' ?
                                    <Recipe />
                                    :
                                    selectedMenuItem === 'Текущий заказ на склад' ?
                                        <CurrentOrder />
                                        :
                                        <div>Такого пункта нет</div>
                    }

                </div>
            </div>
        </div>
    );
}
