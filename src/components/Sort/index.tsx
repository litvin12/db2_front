import { Select } from 'antd';
const options = ['Сначала дешевле', 'Сначала дороже', 'По популярности'];
export const Sort = () => {
    const { Option } = Select;
    return (
        <div>
            <Select defaultValue="option1" size='large'>
                {options.map(item => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
}