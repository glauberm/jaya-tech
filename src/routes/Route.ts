import { ReactElement } from 'react';

export default class Route {
    path: string;
    page: ReactElement;

    constructor(path: string, element: ReactElement) {
        this.path = path;
        this.page = element;
    }
}
