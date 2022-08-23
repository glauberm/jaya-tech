import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenLayersMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature, { FeatureLike } from 'ol/Feature';
import { useGeographic } from 'ol/proj';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';

import CountryInfo from '../types/CountryInfo';
import { DataContext } from '../contexts/DataProvider';
import styles from './Map.module.scss';
import pinSvg from '../images/pin.svg';

type Props = {
    countryInfo: CountryInfo | null;
};

export default function Map(props: Props) {
    const [map, setMap] = useState<OpenLayersMap | null>(null);
    const { initialCountryInfo } = useContext(DataContext);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    useGeographic();

    useEffect(() => {
        if (map instanceof OpenLayersMap) {
            map.setTarget(undefined);
            setMap(null);
        }

        if (initialCountryInfo !== null && mapRef.current !== null) {
            const countryInfo = props.countryInfo === null ? initialCountryInfo : props.countryInfo;
            const coordinates = [countryInfo.long, countryInfo.lat];

            const point = new Feature({
                geometry: new Point(coordinates),
                iso3: countryInfo.iso3,
            });

            point.setStyle(new Style({ image: new Icon({ src: pinSvg }) }));

            const map = new OpenLayersMap({
                target: mapRef.current,
                layers: [
                    new TileLayer({ source: new OSM() }),
                    new VectorLayer({ source: new VectorSource({ features: [point] }) }),
                ],
                view: new View({
                    center: coordinates,
                    zoom: 5,
                }),
                controls: [],
            });

            map.on('click', function (event) {
                const features = map.getFeaturesAtPixel(event.pixel);
                const feature: FeatureLike | null = features.length ? features[0] : null;

                if (feature !== null) {
                    navigate(`/${feature.get('iso3')}`);
                }
            });

            setMap(map);

            return () => {
                if (map instanceof OpenLayersMap) {
                    map.setTarget(undefined);
                    setMap(null);
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCountryInfo, props.countryInfo, navigate]);

    return (
        <div className={styles.container}>
            <div ref={mapRef} className={styles.map} />
        </div>
    );
}

Map.defaultProps = {
    countryInfo: null,
};
