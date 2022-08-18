import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
    children: JSX.Element | JSX.Element[];
};

type Context = {
    data: object | null;
    error: object | null;
};

const initialContext: Context = {
    data: null,
    error: null,
};

export const DataContext = createContext<Context>(initialContext);

export default function DataProvider(props: Props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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

    return <DataContext.Provider value={{ data, error }}>{props.children}</DataContext.Provider>;
}
