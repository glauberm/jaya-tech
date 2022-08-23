import React, { useCallback, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import CountryInfo from '../types/CountryInfo';
import { DataContext } from '../contexts/DataProvider';
import Input from '../components/Input';
import Button from '../components/Button';
import Map from '../components/Map';

export default function SearchMapForm() {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
    const { error: requestError, searchCountryInfo } = useContext(DataContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetError = useCallback(debounce(setError, 300), []);
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

    useEffect(() => {
        if (value === '' || countryInfo !== null) {
            setError('');
        } else {
            if (requestError === true) {
                debouncedSetError('Request error.');
            } else if (countryInfo === null) {
                debouncedSetError('Country not found.');
            }
        }
    }, [requestError, debouncedSetError, value, countryInfo]);

    return (
        <form noValidate onSubmit={onSubmit}>
            <Input
                name="country"
                label="Country name"
                type="text"
                placeholder="Italy, Russia, Colombia..."
                value={value}
                error={error}
                onChange={onChange}
                addOn={<Button type="submit">Go</Button>}
            />
            <Map countryInfo={countryInfo} />
        </form>
    );
}
