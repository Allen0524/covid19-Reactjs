import {useEffect, useState} from 'react'
import './App.css';
import Infobox from './components/Infobox';
import RankDeath from './components/RankDeath';
import RankRecovered from './components/RankRecovered';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("all");
  const [countryInfo, setCountryInfo] = useState({});
  const [rankData, setRankData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:23.58, lng:120.58});
  const [mapZoom, setMapZoom] = useState(3);

  // get all country name
  useEffect(() => {
    const getCountriesData= async () => {
      await axios.get("https://disease.sh/v3/covid-19/countries/")
      .then(res => {
        const countries = res.data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  // get global data
  useEffect(()=>{
    axios.get("https://disease.sh/v3/covid-19/all")
    .then(res => setCountryInfo(res.data));
  }, []);

  // pick country
  const onCountryPicked = async (e) => {
    const selCountry = e.target.value;
    
    const url = selCountry === 'all' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${selCountry}`;
    
    await axios.get(url).then(res => {
      setCountry(selCountry);
      setCountryInfo(res.data);
      setMapZoom(4);
      setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      
    });
  };

  // get Rank Data
  useEffect(()=>{
    const getRankData = async ()=>{
      await axios.get("https://disease.sh/v3/covid-19/countries").then(res => setRankData(res.data));
    };
    getRankData();
  },[]);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <h1>COVID19</h1>
        <FormControl>
          <Select variant="outlined" onChange={onCountryPicked} value={country}>
            <MenuItem value={country}>{country}</MenuItem>
            {countries.map((country, i) => (
              <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Infobox on the top of the chart */}
      <div className="app__belowWrap">
        <div className="app__content">
          <div className="app__stats">
            <Infobox title='Confirmed' total={countryInfo.cases} number={countryInfo.todayCases} />
            <Infobox title='Recovered' total={countryInfo.recovered} number={countryInfo.todayRecovered} />
            <Infobox title='Deaths' total={countryInfo.deaths} number={countryInfo.todayDeaths} />
          </div>
          {/* chart left */}
          <Map center={mapCenter} zoom={mapZoom} />
          {/* Rank right */}
        </div>
        <div className="app__table">
            <div className="app__rankwrap">
              <RankDeath lists={rankData} />
              <RankRecovered lists={rankData}/>
            </div>
            {/* Line Graph */}
            <div className="app__graph">
                <LineGraph/>
            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
