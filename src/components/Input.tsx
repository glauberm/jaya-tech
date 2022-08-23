import styles from './Input.module.scss';

type Props = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    addOn?: JSX.Element;
};

export default function Input(props: Props) {
    const { name, label, type, placeholder, value, error, onChange } = props;

    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <input
                        id={name}
                        name={name}
                        type={type || 'text'}
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={onChange}
                        className={`${styles.input} ${error !== '' ? styles.errorInput : ''}`}
                    />
                    {props.addOn}
                </div>
                {error !== '' && <p className={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );
}
