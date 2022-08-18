import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <span className={styles.logo}>Company logo</span>
            </div>
        </header>
    );
}
