import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

import Country from '../types/Country';
import { DataContext } from '../contexts/DataProvider';
import styles from './Pages.module.scss';

dayjs.locale('en-us');

export default function CountryPage() {
    const [country, setCountry] = useState<Country | null>(null);
    const { searchCountry } = useContext(DataContext);
    const params = useParams();

    useEffect(() => {
        if (params.hasOwnProperty('iso3') && params.iso3 !== undefined) {
            setCountry(searchCountry(params.iso3));
        }
    }, [params, searchCountry]);

    if (country === null) {
        return null;
    }

    const date = dayjs(country.updated);
    const fDate = date.format('MM/DD/YYYY');
    const fHour = date.format('HH:mm');
    const fTimezone = date.format('Z');

    return (
        <div>
            <h1 className={styles.heading}>Covid report - {country.country}</h1>
            <dl className={styles.descriptionList}>
                <div>
                    <dt>Confirmed cases</dt>
                    <dd>{country.cases}</dd>
                </div>
                <div>
                    <dt>Recovered cases</dt>
                    <dd>{country.recovered}</dd>
                </div>
                <div>
                    <dt>Death cases</dt>
                    <dd>{country.deaths}</dd>
                </div>
                <div>
                    <dt>Last update</dt>
                    <dd>{`${fDate}, ${fHour} (${fTimezone})`}</dd>
                </div>
            </dl>
        </div>
    );
}
