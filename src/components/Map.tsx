import { useContext, useEffect, useRef, useState } from 'react';
import OpenLayersMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj';

import { DataContext } from '../contexts/DataProvider';
import styles from './Map.module.scss';

type Props = {
    value: string;
};

export default function Map(props: Props) {
    const [map, setMap] = useState<OpenLayersMap | null>(null);
    const mapRef = useRef(null);
    const dataProvider = useContext(DataContext);

    useGeographic();

    useEffect(() => {
        if (mapRef.current !== null && dataProvider.initialCoordinates !== null) {
            setMap(
                new OpenLayersMap({
                    target: mapRef.current,
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                    view: new View({
                        center: dataProvider.initialCoordinates,
                        zoom: 3,
                    }),
                    controls: [],
                })
            );
        }
    }, [mapRef, dataProvider.initialCoordinates]);

    return <div ref={mapRef} className={styles.map}></div>;
}
