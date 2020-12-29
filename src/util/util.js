import React from "react";
import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral'

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
    },
};


export const showDataOnMap = (data, caseType) => {

    return(
    data.map((country, i)=> (
        <Circle 
        // 用pathoptions才能修改資料
            pathOptions={{color: caseTypeColor[caseType].hex,
                fillColor:caseTypeColor[caseType].hex}}
            key={i}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            // color={caseTypeColor[caseType].hex}
            // fillColor={caseTypeColor[caseType].hex}
            fillOpacity={0.4}
            radius={Math.sqrt(country[caseType])*caseTypeColor[caseType].multiplier} 
        >
            <Popup>
                <div className="info-container">
                    <img className="info-flag" src={country.countryInfo.flag} alt=""/>
                    {/* <div className="info-flag" style={{background:`url(${country.countryInfo.flag})`}}></div> */}
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format('0,0')}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format('0,0')}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format('0,0')}</div>
                </div>
            </Popup>
        </Circle>
    ))
    )};
