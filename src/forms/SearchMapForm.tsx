import React, { useContext, useEffect, useState } from 'react';

import { DataContext } from '../contexts/DataProvider';
import Input from '../components/Input';
import Map from '../components/Map';
import styles from './SearchMapForm.module.scss';

export default function SearchMapForm() {
    const [value, setValue] = useState('');
    const data = useContext(DataContext);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event !== undefined) {
            setValue(event.target.value);
        }
    };

    console.log(data);

    return (
        <form noValidate onSubmit={onSubmit}>
            <div className={styles.wrapper}>
                <Input
                    name="country"
                    label="Country name"
                    type="text"
                    placeholder="Italia, Russia, Colombia..."
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className={styles.button}>
                    Go
                </button>
            </div>
            {value}
            <Map value={value} />
        </form>
    );
}
