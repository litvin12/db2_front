import { useGetWholeSaleOrdersQuery } from '../../redux/api';
import { useAddWholeSaleOrderMutation } from '../../redux/api';

export const Test = () => {
    const { data, isLoading } = useGetWholeSaleOrdersQuery();
    const [addWholeSaleOrder] = useAddWholeSaleOrderMutation();
    console.log(data);
    return (
        <div>
            <h1>Test</h1>
            <button onClick={() => addWholeSaleOrder({ medicineId: 1, quantity: 1, status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })}>Add</button>
        </div>
    )
}