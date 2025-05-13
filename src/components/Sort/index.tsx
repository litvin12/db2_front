import React from 'react';
import { Select } from 'antd';
import styles from './styles.module.scss';

const options = ['Сначала дешевле', 'Сначала дороже'];

type SortProps = {
    onChange?: (value: string) => void;
};

export const Sort: React.FC<SortProps> = ({ onChange }) => {
    const { Option } = Select;
    return (
        <div className={styles.containerSort}>
            <Select defaultValue={options[0]} size='large' onChange={onChange}>
                {options.map((item, i) => (
                    <Select.Option key={i} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};