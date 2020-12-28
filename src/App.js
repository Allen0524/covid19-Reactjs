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
  // 取得下拉選單國家資料
  const [dropDownName, setdropDownName] = useState([]);
  // 選擇國家
  const [selCountry, setSelCountry] = useState("all");
  const [countryInfo, setCountryInfo] = useState({});
  const [rankData, setRankData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:23.58, lng:120.58});
  const [mapZoom, setMapZoom] = useState(3);
  // 地圖上各國家資料
  const [mapCountries, setMapCountries] = useState([]);

  // get all country name
  useEffect(() => {
    const getCountriesData= async () => {
      await axios.get("https://disease.sh/v3/covid-19/countries/")
      .then(res => {
        const countries = res.data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setdropDownName(countries);
        setMapCountries(res.data);
      });
    };
    getCountriesData();
  }, []);

  useEffect(()=>{
    const getGlobalData = async () => {
      await axios.get("https://disease.sh/v3/covid-19/all")
      .then(res => setCountryInfo(res.data));
    };
    getGlobalData();
  }, []);

  // pick country
  const onCountryPicked = async (e) => {
    let selectedCountry = e.target.value;
    let url = selectedCountry === 'all' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;
    await axios.get(url).then(res => {
      setSelCountry(selectedCountry);
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
          <Select variant="outlined" onChange={onCountryPicked} value={selCountry}>
            <MenuItem value="all">all</MenuItem>
            {dropDownName.map((country, i) => (
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
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
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
