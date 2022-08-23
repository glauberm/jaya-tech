import React, { useCallback, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import CountryInfo from '../types/CountryInfo';
import { DataContext } from '../contexts/DataProvider';
import Input from '../components/Input';
import Map from '../components/Map';
import styles from './SearchMapForm.module.scss';

export default function SearchMapForm() {
    const [value, setValue] = useState<string>('');
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
    const { searchCountryInfo } = useContext(DataContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetCountryInfo = useCallback(debounce(setCountryInfo, 300), []);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event !== undefined) {
            setValue(event.target.value);
        }
    };

    useEffect(() => {
        debouncedSetCountryInfo(searchCountryInfo(value));
    }, [debouncedSetCountryInfo, searchCountryInfo, value]);

    return (
        <form noValidate onSubmit={onSubmit}>
            <div className={styles.wrapper}>
                <Input
                    name="country"
                    label="Country name"
                    type="text"
                    placeholder="Italy, Russia, Colombia..."
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className={styles.button}>
                    Go
                </button>
            </div>
            <Map countryInfo={countryInfo} />
        </form>
    );
}
