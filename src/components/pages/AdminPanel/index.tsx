import React from 'react';

import styles from './styles.module.scss';
import { useGetOrderQuery } from '../../../redux/api';
import { OrdersAdm } from '../../AdminPanelComponents/Orders';
const menuItems = [
    'Заказы',
    'Рецепты',
    'Все товары',
    'Заказы на оптовый склад'
]
export const AdminPanel = () => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(menuItems[0]);
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
                {selectedMenuItem === 'Заказы' ?
                    <OrdersAdm />
                    :
                    selectedMenuItem === 'Рецепты' ?
                        <div>222</div>
                        :
                        selectedMenuItem === 'Все товары' ?
                            <div>333</div>
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
