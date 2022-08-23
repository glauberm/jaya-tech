import styles from './Button.module.scss';

type Props = {
    type: 'button' | 'submit' | 'reset';
    children: string | JSX.Element | JSX.Element[];
};

export default function Button(props: Props) {
    return (
        <button type={props.type} className={styles.button}>
            {props.children}
        </button>
    );
}
