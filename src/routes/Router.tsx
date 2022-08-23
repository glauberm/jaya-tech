import { Route as ReactRoute, Routes } from 'react-router-dom';

import Route from './Route';
import DefaultLayout from '../layouts/DefaultLayout';
import IndexPage from '../pages/IndexPage';
import CountryPage from '../pages/CountryPage';

const routes: Route[] = [new Route('/', <IndexPage />), new Route('/:iso3', <CountryPage />)];

export default function Router() {
    return (
        <Routes>
            {routes.map((route, key) => (
                <ReactRoute key={key} path={route.path} element={<DefaultLayout>{route.page}</DefaultLayout>} />
            ))}
        </Routes>
    );
}
