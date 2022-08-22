import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import DataProvider from './contexts/DataProvider';
import Router from './routes/Router';

const rootElement = document.getElementById('root');

if (rootElement === null) {
    throw new Error('Root element not found.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <DataProvider>
                <Router />
            </DataProvider>
        </BrowserRouter>
    </React.StrictMode>
);

if (process.env.NODE_ENV === 'development') {
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    // reportWebVitals(console.log);
}
