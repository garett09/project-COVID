import React, { useState, useEffect } from "react";
import { FormControl } from '@material-ui/core';
import {
  MenuItem,
  Select,
} from "@material-ui/core"
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
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
  return ( //BEM NAMING CONVENTION
    <div className="app">
      <div className="app__header">
        <h1>Coronavirus Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="ABC">
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>



      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
