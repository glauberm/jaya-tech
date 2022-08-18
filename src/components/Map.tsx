import { useEffect, useRef, useState } from 'react';
import OpenLayersMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import styles from './Map.module.scss';

interface MapProps {
    value: string;
}

export default function Map(props: MapProps) {
    const [map, setMap] = useState<OpenLayersMap | null>(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current !== null) {
            setMap(
                new OpenLayersMap({
                    target: mapRef.current,
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                    view: new View({
                        center: [0, 0],
                        zoom: 2,
                    }),
                    controls: [],
                })
            );
        }
    }, [mapRef]);

    return <div ref={mapRef} className={styles.map}></div>;
}
