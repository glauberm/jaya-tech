import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import Country from '../types/Country';
import CountryInfo from '../types/CountryInfo';

type Context = {
    data: Array<Country> | null;
    error: object | null;
    countriesInfos: CountryInfo[] | null;
    initialCoordinates: number[] | null;
};

const initialContext: Context = {
    data: null,
    error: null,
    countriesInfos: null,
    initialCoordinates: null,
};

export const DataContext = createContext<Context>(initialContext);

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function DataProvider(props: Props) {
    const [data, setData] = useState<Context['data']>(initialContext.data);
    const [error, setError] = useState<Context['error']>(initialContext.error);
    const [countriesInfos, setCountriesInfos] = useState<Context['countriesInfos']>(initialContext.countriesInfos);
    const [initialCoordinates, setInitialCoordinates] = useState<Context['initialCoordinates']>(
        initialContext.initialCoordinates
    );

    useEffect(() => {
        axios
            .get('https://disease.sh/v3/covid-19/countries')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    useEffect(() => {
        if (data === null) return;

        const countriesInfos = data.map(({ countryInfo }) => countryInfo);
        const brazil = data.find((country) => country.countryInfo.iso3 === 'BRA');

        setCountriesInfos(countriesInfos);

        if (brazil === undefined) {
            setInitialCoordinates([0, 0]);
        } else {
            setInitialCoordinates([brazil.countryInfo.long, brazil.countryInfo.lat]);
        }
    }, [data]);

    return (
        <DataContext.Provider value={{ data, error, countriesInfos, initialCoordinates }}>
            {props.children}
        </DataContext.Provider>
    );
}
