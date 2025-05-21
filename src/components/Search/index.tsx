import styles from './styles.module.scss'

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
    return (
        <div className={styles.containerSearch}>
            <input
                type="text"
                placeholder="Поиск"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}