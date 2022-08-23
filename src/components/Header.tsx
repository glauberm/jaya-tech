import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    Company logo
                </Link>
            </div>
        </header>
    );
}
