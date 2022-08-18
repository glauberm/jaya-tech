import styles from './Input.module.scss';

interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    const { name, label, type, placeholder, value, onChange } = props;

    return (
        <div>
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
