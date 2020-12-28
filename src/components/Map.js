import React from 'react';
import './Map.css';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import {showDataOnMap} from '../util/util';

function Map({countries, center, zoom}) {  

    function MyComponent() {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyComponent/>
                {showDataOnMap(countries, 'cases')}
                
            </MapContainer>
        </div>
    )
}

export default Map
