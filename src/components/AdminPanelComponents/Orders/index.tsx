import styles from './styles.module.scss'
import { getOrder, medicines, useGetRecipeQuery, useGetRecipeComponentsQuery, useGetUserQuery } from '../../../redux/api';
import { useEditOrderStatusMutation } from '../../../redux/api';
import React, { useState, useMemo } from 'react';
import { Select, Dropdown, Menu, Button, Input, Modal } from 'antd';
const statuses = ['Готов к приготовлению', 'Завершен', 'Приготавливается', 'Ожидает получения', 'Ожидает поставки'];
const types = ['Готовый', 'Приготовляемое'];
type props = {
    data: getOrder[];
    medicines: medicines[];
}
const sortOptions = [
    { label: 'По дате (новые сверху)', value: 'date_desc' },
    { label: 'По дате (старые сверху)', value: 'date_asc' },
    { label: 'По сумме (по возрастанию)', value: 'sum_asc' },
    { label: 'По сумме (по убыванию)', value: 'sum_desc' },
];
const filterOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Ожидает приготовления', value: 'ready_to_preparation' },
    { label: 'Готовое', value: 'ready' },
    { label: 'Ожидает поставки', value: 'waiting_for_stock' },
    { label: 'Завершен', value: 'completed' },
];
const RecipeModal = ({ recipeId, onClose }: { recipeId: number, onClose: () => void }) => {
    const { data: recipes } = useGetRecipeQuery();
    const { data: components } = useGetRecipeComponentsQuery();
    const recipe = recipes?.find(r => r.id === recipeId);
    const recipeComponents = components?.filter(c => c.recipeId === recipeId);
    return (
        <div className={styles.recipeModal} style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: 15, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 1000 }}>
            <button onClick={onClose} style={{ float: 'right' }}>Закрыть</button>
            {recipe ? (
                <div className={styles.recipe}>
                    <div><b>Время приготовления:</b> {recipe.preparationTime}</div>
                    <div className={styles.technology}><b>Технология приготовления:</b> {recipe.technology}</div>
                    <div><b>Компоненты:</b></div>
                    <ul>
                        {recipeComponents?.map(c => (
                            <li key={c.id}>
                                Компонент: {c.componentId}, Количество: {c.quantityNeeded}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Рецепт не найден</div>
            )}
        </div>
    );
};

export const OrdersAdm = ({ data, medicines }: props) => {
    const [editOrderStatus] = useEditOrderStatusMutation();
    const [sortOrder, setSortOrder] = useState('date_desc');
    const [showRecipe, setShowRecipe] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: users } = useGetUserQuery();
    const [selectedOrder, setSelectedOrder] = useState<getOrder | null>(null);
    const [showCustomerModal, setShowCustomerModal] = useState(false);

    const menu = (
        <Menu
            onClick={({ key }) => setFilter(key)}
            selectedKeys={[filter]}
            items={filterOptions.map(opt => ({
                key: opt.value,
                label: opt.label,
            }))}
        />
    );

    // Фильтрация и сортировка заказов
    const filteredAndSortedOrders = useMemo(() => {
        if (!data) return [];
        let arr = [...data];
        // Фильтрация по поисковому запросу
        if (searchQuery.trim()) {
            arr = arr.filter(order => {
                const medicine = medicines.find(med => med.id === order.medicineId);
                const name = medicine?.name?.toLowerCase() || '';
                const statusRaw = (order.status || '').toLowerCase();
                const typeRaw = (order.type || '').toLowerCase();
                // Русские отображаемые значения:
                const statusDisplay =
                    order.status === 'waiting_for_receive' ? 'ожидает получения' :
                        order.status === 'ready_to_preparation' ? 'готов к приготовлению' : '';
                const typeDisplay =
                    order.type === 'ready' ? 'готовый' :
                        order.type === 'manufacturable' ? 'приготавливаемое' : '';
                const query = searchQuery.toLowerCase();
                return (
                    name.includes(query) ||
                    statusRaw.includes(query) ||
                    typeRaw.includes(query) ||
                    statusDisplay.includes(query) ||
                    typeDisplay.includes(query)
                );
            });
        }
        // Фильтрация по выбранному фильтру
        if (filter !== 'all') {
            if (filter === 'waiting_for_receive') {
                arr = arr.filter(order => order.type === 'manufacturable' && order.status === 'ready_to_receive');
            } else if (filter === 'ready_to_preparation') {
                arr = arr.filter(order => order.status === 'ready_to_preparation' && order.type === 'manufacturable');
            } else if (filter === 'manufacturable') {
                arr = arr.filter(order => order.type === 'manufacturable');
            } else if (filter === 'ready') {
                arr = arr.filter(order => order.type === 'ready');
            } else if (filter === 'waiting_for_stock') {
                arr = arr.filter(order => order.status === 'waiting_for_stock');
            } else {
                arr = arr.filter(order => order.status === filter);
            }
        }
        // Сортировка
        arr.sort((a, b) => {
            if (sortOrder === 'date_desc') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortOrder === 'date_asc') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                const medA = medicines.find(med => med.id === a.medicineId);
                const medB = medicines.find(med => med.id === b.medicineId);
                const sumA = (medA?.price || 0) * 1;
                const sumB = (medB?.price || 0) * 1;
                if (sortOrder === 'sum_asc') {
                    return sumA - sumB;
                } else if (sortOrder === 'sum_desc') {
                    return sumB - sumA;
                }
            }
            return 0;
        });
        return arr;
    }, [data, medicines, sortOrder, filter, searchQuery]);

    const handleShowRecipe = (recipeId?: number) => {
        if (recipeId) {
            setSelectedRecipeId(recipeId);
            setShowRecipe(true);
        }
    };

    return (
        <div>
            <div className={styles.filters}>
                <Input
                    placeholder="Поиск по названию, статусу или типу"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: 260 }}
                />
                <Select
                    value={sortOrder}
                    onChange={setSortOrder}
                    options={sortOptions}
                    style={{ width: 220 }}
                />
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button>
                        Фильтр: {filterOptions.find(opt => opt.value === filter)?.label}
                    </Button>
                </Dropdown>
            </div>
            <div className={styles.containerItem}>
                {filteredAndSortedOrders.map(order => {
                    const medicine = medicines.find(med => med.id === order.medicineId);
                    return (
                        <div
                            key={order.id}
                            className={order.type === 'manufacturable' ? styles.component : styles.component2}
                            style={{ cursor: 'pointer' }}
                            onClick={() => { setSelectedOrder(order); setShowCustomerModal(true); }}
                        >
                            <h4 className={styles.name}>
                                {medicine?.name || `Not found (id: ${order.medicineId})`}
                            </h4>
                            <span className={styles.type}>{order.type === 'ready' ? types[0] : types[1]}</span>
                            <span className={styles.status}>
                                {order.status === 'ready_to_preparation' && statuses[0]}
                                {order.status === 'completed' && statuses[1]}
                                {order.status === 'preparing' && statuses[2]}
                                {order.status === 'waiting_for_receive' && statuses[3]}
                                {order.status === 'waiting_for_stock' && statuses[4]}
                            </span>
                            {order.status === 'ready_to_preparation' && <button className={styles.button} onClick={e => { e.stopPropagation(); editOrderStatus({ id: order.id, status: 'waiting_for_receive', type: order.type }) }}>Приготовлено</button>}
                            {/* Показываем сумму заказа */}
                            <div className={styles.sum}>
                                Сумма заказа: {(medicine?.price || 0) * 1} ₽
                            </div>
                            {/* Показываем дату заказа */}
                            <div className={styles.date}>
                                Дата заказа: {new Date(order.createdAt).toLocaleString()}
                            </div>
                            {/* Кнопка для показа рецепта */}
                            {medicine?.recipeId && (
                                <button className={styles.button} onClick={e => { e.stopPropagation(); handleShowRecipe(medicine.recipeId); }}>
                                    Рецепт
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            {showRecipe && selectedRecipeId && (
                <RecipeModal
                    recipeId={selectedRecipeId}
                    onClose={() => setShowRecipe(false)}
                />
            )}
            <Modal
                open={showCustomerModal}
                onCancel={() => setShowCustomerModal(false)}
                footer={null}
                title="Информация о заказчике"
            >
                {selectedOrder && users ? (
                    (() => {
                        const customer = users.find(u => u.id === selectedOrder.customerId);
                        return customer ? (
                            <div>
                                <div><b>Имя:</b> {customer.firstName} {customer.secondName}</div>
                                <div><b>Телефон:</b> {customer.phoneNumber}</div>
                                <div><b>Адрес:</b> {customer.address}</div>
                                <div><b>Роль:</b> {customer.role === 'admin' ? 'Администратор' : customer.role === 'user' ? 'Пользователь' : customer.role === 'pharmacist' ? 'Фармацевт' : customer.role}</div>
                            </div>
                        ) : (
                            <div>Информация о заказчике не найдена</div>
                        );
                    })()
                ) : (
                    <div>Загрузка...</div>
                )}
            </Modal>
        </div>
    );
}