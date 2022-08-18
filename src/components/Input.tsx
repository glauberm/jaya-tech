import styles from './Input.module.scss';

type Props = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: Props) {
    const { name, label, type, placeholder, value, onChange } = props;

    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type || 'text'}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                className={styles.input}
            />
        </div>
    );
}
