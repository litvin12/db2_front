import React from 'react';
import { Select } from 'antd';
const options = ['Сначала дешевле', 'Сначала дороже', 'По популярности'];
export const Sort = () => {
    const { Option } = Select;
    return (
        <div>
            <Select defaultValue={options[0]} size='large'>
                {options.map((item, i) => (
                    <Select.Option key={i} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
}