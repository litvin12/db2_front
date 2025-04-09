import { useGetWholeSaleOrdersQuery } from '../../redux/api';
import { useAddWholeSaleOrderMutation } from '../../redux/api';

export const Test = () => {
    const { data, isLoading } = useGetWholeSaleOrdersQuery();
    const [addWholeSaleOrder] = useAddWholeSaleOrderMutation();

    const onClickAddOrder = () => {
        addWholeSaleOrder({medicineId: 1, quantity: 1, status: "pending", createdAt: "2025-04-09T09:48:00.626Z", updatedAt: "2025-04-09T09:48:00.626Z"})
        console.log('POST');
    }
    const onClickGet = () => {
        console.log(data);
    }
    return (
        <div>
            <h1>Test</h1>
            <button onClick={onClickAddOrder}>Add</button>
            <button onClick={onClickGet}>Get</button>
        </div>
    )
}
