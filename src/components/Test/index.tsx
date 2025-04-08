import { useGetMedicQuery } from '../../redux/api';
import { useAddWholeSaleOrderMutation } from '../../redux/api';

export const Test = () => {
    const { data, isLoading } = useGetMedicQuery();
    const [addWholeSaleOrder] = useAddWholeSaleOrderMutation();
    console.log(data);
    return (
        <div>
            <h1>Test</h1>
            <button onClick={() => {console.log(data)}}>Add</button>
        </div>
    )
}