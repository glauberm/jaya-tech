import { useContext, useEffect, useRef, useState } from 'react';
import OpenLayersMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';

import { DataContext } from '../contexts/DataProvider';
import styles from './Map.module.scss';

type Props = {
    value: string;
};

export default function Map(props: Props) {
    const [map, setMap] = useState<OpenLayersMap | null>(null);
    const dataProvider = useContext(DataContext);
    const mapRef = useRef(null);

    useGeographic();

    useEffect(() => {
        if (
            dataProvider.countriesInfos !== null &&
            dataProvider.initialCoordinates !== null &&
            mapRef.current !== null
        ) {
            const features: Feature[] = [];

            dataProvider.countriesInfos.forEach(({ flag, long, lat }) => {
                const point = new Feature({ geometry: new Point([long, lat]) });

                point.setStyle(
                    new Style({
                        image: new Icon({
                            src: flag,
                            size: [250, 167],
                            scale: 0.2,
                        }),
                    })
                );

                features.push(point);
            });

            setMap(
                new OpenLayersMap({
                    target: mapRef.current,
                    layers: [
                        new TileLayer({ source: new OSM() }),
                        new VectorLayer({ source: new VectorSource({ features: features }) }),
                    ],
                    view: new View({
                        center: dataProvider.initialCoordinates,
                        zoom: 5,
                        minZoom: 5,
                    }),
                    controls: [],
                })
            );
        }
    }, [mapRef, dataProvider.initialCoordinates]);

    return <div ref={mapRef} className={styles.map}></div>;
}
