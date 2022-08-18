import { useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function BaseLayout(props: Props) {
    useEffect(() => {
        const loading = document.getElementById('loading');

        if (loading === null) {
            throw new Error('Loading element not found');
        }

        loading.hidden = true;
        loading.style.display = 'none';

        return () => {
            loading.hidden = false;
            loading.style.display = 'flex';
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <Header />

            <div className={styles.container}>
                <div className={styles.box}>
                    <main>{props.children}</main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
