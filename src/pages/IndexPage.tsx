import SearchMapForm from '../forms/SearchMapForm';
import styles from './Pages.module.scss';

export default function IndexPage() {
    return (
        <div>
            <h1 className={styles.heading}>Covid report</h1>
            <p className={styles.paragraph}>Search for a country to get the latest Covid data in that place.</p>
            <SearchMapForm />
        </div>
    );
}
