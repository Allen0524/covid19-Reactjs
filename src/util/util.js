import React from "react";
import {Circle, Popup} from 'react-leaflet';

const caseTypeColor = {
    cases: {
        hex: "#cc1034",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200
    },
    deaths: {
        hex: "fb4443",
        multiplier: 2000
    }
}

export const showDataOnMap = (data, caseType) => (
    
    data.map((country, i)=> (
        <Circle 
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColor[caseType].hex}
            fillColor={caseTypeColor[caseType].hex}
            radius={Math.sqrt(country[caseType])*caseTypeColor[caseType].multiplier}
            key={i}
        >
            <Popup>
                <h3>I am a Popup.</h3>
            </Popup>
        </Circle>
    ))
);