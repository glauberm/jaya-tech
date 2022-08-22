import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import Country from '../types/Country';
import CountryInfo from '../types/CountryInfo';

type Context = {
    data: Array<Country> | null;
    error: object | null;
    initialCountryInfo: CountryInfo | null;
    searchCountryInfo: (searchVal: string) => CountryInfo | null;
};

const initialContext: Context = {
    data: null,
    error: null,
    initialCountryInfo: null,
    searchCountryInfo: (searchVal: string) => null,
};

export const DataContext = createContext<Context>(initialContext);

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function DataProvider(props: Props) {
    const [data, setData] = useState<Context['data']>(initialContext.data);
    const [error, setError] = useState<Context['error']>(initialContext.error);
    const [initialCountryInfo, setInitialCountryInfo] = useState<Context['initialCountryInfo']>(
        initialContext.initialCountryInfo
    );

    const searchCountryInfo = (searchVal: string) => {
        if (data === null) return null;

        const country = data.find(({ country }) => country === searchVal);

        if (country === undefined) return null;

        return country.countryInfo;
    };

    useEffect(() => {
        if (process.env.REACT_APP_API_URL === undefined) {
            throw new Error('Env variable REACT_APP_API_URL is undefined');
        }

        axios
            .get(process.env.REACT_APP_API_URL)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    useEffect(() => {
        if (data === null) return;

        const brazil = data.find((country) => country.countryInfo.iso3 === 'BRA');

        if (brazil === undefined) return;

        setInitialCountryInfo(brazil.countryInfo);
    }, [data]);

    return (
        <DataContext.Provider value={{ data, error, initialCountryInfo, searchCountryInfo }}>
            {props.children}
        </DataContext.Provider>
    );
}
