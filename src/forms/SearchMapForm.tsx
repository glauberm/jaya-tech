import React, { useState } from 'react';

import Input from '../components/Input';
import styles from './SearchMapForm.module.scss';

export default function SearchMapForm() {
    const [value, setValue] = useState('');

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const onChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event !== undefined) {
            setValue(event.target.value);
        }
    };

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
        </form>
    );
}
