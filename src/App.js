import React, { useState, useEffect } from "react";
import { CardContent, 
  FormControl, 
  MenuItem,
  Select,
  Card, } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  //API https://disease.sh/v3/covid-19/countries
  //STATE = How to write a variable in react
  //useEEFFECT: run a piece of code based on a given condition
  useEffect(() => {
    //The code inside here will run once when the component loads and not again after
    //async: send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso3
            }
          ));
          setCountries(countries);
        });
    }
    getCountriesData();
  }, []);
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return ( //BEM NAMING CONVENTION
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Coronavirus Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
        <h3> Live cases by country</h3>
        <h3> Worldwide cases by country</h3>
          {/* Table */}
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
