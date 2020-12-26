import {useEffect, useState} from 'react'
import './App.css';
import Infobox from './components/Infobox';
import RankDeath from './components/RankDeath';
import RankRecovered from './components/RankRecovered';
import LineGraph from './components/LineGraph';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("all");
  const [countryInfo, setCountryInfo] = useState({});
  const [rankData, setRankData] = useState([]);
  // get all country name
  useEffect(() => {
    const getdata= async () => {
      const data = await axios.get("https://covid19.mathdro.id/api/countries")
      .then(res => (res.data.countries));
      // console.log(data);
      setCountries(data);
    }
    getdata();
  }, []);

  // get global data
  useEffect(()=>{
    axios.get("https://disease.sh/v3/covid-19/all")
    .then(res => setCountryInfo(res.data));
  }, []);

  // pick country
  const onCountryPicked = async (e) => {
    const selCountry = e.target.value;
    setCountry(selCountry);
    let url = selCountry==='all' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${selCountry}`;
    if (selCountry === "Taiwan*"){
      url = "https://disease.sh/v3/covid-19/countries/Taiwan";
    }
    await axios.get(url).then(res => {
      setCountryInfo(res.data)
    })
  }

  // get Rank Data
  useEffect(()=>{
    axios.get("https://disease.sh/v3/covid-19/countries").then(res => setRankData(res.data));
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
              <MenuItem key={i} value={country.name}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Infobox on the top og the chart */}
      <div className="app__content">
        <div className="app__stats">
          <Infobox title='Confirmed' total={countryInfo.cases} number={countryInfo.todayCases} />
          <Infobox title='Recovered' total={countryInfo.recovered} number={countryInfo.todayRecovered} />
          <Infobox title='Deaths' total={countryInfo.deaths} number={countryInfo.todayDeaths} />
        </div>
        {/* chart left */}
        {/* Rank right */}
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
