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

import CountryInfo from '../types/CountryInfo';
import { DataContext } from '../contexts/DataProvider';
import styles from './Map.module.scss';
import pinSvg from '../images/pin.svg';

type Props = {
    countryInfo: CountryInfo | null;
};

export default function Map(props: Props) {
    const [map, setMap] = useState<OpenLayersMap | null>(null);
    const dataProvider = useContext(DataContext);
    const mapRef = useRef(null);

    useGeographic();

    useEffect(() => {
        if (map instanceof OpenLayersMap) {
            map.setTarget(undefined);
            setMap(null);
        }

        if (dataProvider.initialCountryInfo !== null && mapRef.current !== null) {
            const coordinates =
                props.countryInfo === null
                    ? [dataProvider.initialCountryInfo.long, dataProvider.initialCountryInfo.lat]
                    : [props.countryInfo.long, props.countryInfo.lat];

            const point = new Feature({ geometry: new Point(coordinates) });

            point.setStyle(new Style({ image: new Icon({ src: pinSvg }) }));

            const tileLayer = new TileLayer({ source: new OSM() });

            const vectorLayer = new VectorLayer({ source: new VectorSource({ features: [point] }) });

            setMap(
                new OpenLayersMap({
                    target: mapRef.current,
                    layers: [tileLayer, vectorLayer],
                    view: new View({
                        center: coordinates,
                        zoom: 5,
                    }),
                    controls: [],
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProvider.initialCountryInfo, props.countryInfo]);

    useEffect(() => {
        if (map === null) return;

        map.on('singleclick', function (event) {
            console.log(event);
        });
    }, [map]);

    return (
        <div className={styles.container}>
            <div ref={mapRef} className={styles.map} />
        </div>
    );
}

Map.defaultProps = {
    countryInfo: null,
};
