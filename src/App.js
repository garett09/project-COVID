import React, { useState, useEffect } from "react";
import { FormControl } from '@material-ui/core';
import {
  MenuItem,
  Select,
} from "@material-ui/core"
import InfoBox from './InfoBox';
import Vaccinebox from './Vaccinebox';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
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
        <InfoBox title="Cases" cases={123} total={2000}/>

          <InfoBox title="Recovered" cases={42536} total={3000}/>

            <InfoBox title="Deaths" cases={134645723} total={4000}/>
          
          <Vaccinebox title="Vaccine rollout" totalVaccinated={234} peopleVaccinated={3456} peopleFullyVaccinated={4563}/>
      </div>



      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
