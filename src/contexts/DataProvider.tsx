import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import Country from '../types/Country';

type Context = {
    data: Array<Country> | null;
    error: object | null;
    initialCoordinates: number[] | null;
};

const initialContext: Context = {
    data: null,
    error: null,
    initialCoordinates: null,
};

export const DataContext = createContext<Context>(initialContext);

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function DataProvider(props: Props) {
    const [data, setData] = useState<Context['data']>(initialContext.data);
    const [error, setError] = useState<Context['error']>(initialContext.error);
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

        const country = data.find((country) => country.countryInfo.iso3 === 'BRA');

        if (country === undefined) return;

        setInitialCoordinates([country.countryInfo.long, country.countryInfo.lat]);
    }, [data]);

    return <DataContext.Provider value={{ data, error, initialCoordinates }}>{props.children}</DataContext.Provider>;
}
