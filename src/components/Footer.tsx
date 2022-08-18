import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span className={styles.logo}>Company logo</span>
                <hr className={styles.hr} />
                <p>
                    <small className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Company. All rights reserved.
                    </small>
                </p>
            </div>
        </footer>
    );
}
