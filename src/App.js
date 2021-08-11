import React, { useState, useEffect } from "react";
import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import LineGraph from './LineGraph'
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      });
  }, [])
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
              name: country.country, //USA, PHILIPPINES, INDIA, AT IBA PA
              value: country.countryInfo.iso3 //USA, PH, IND
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData)
          setCountries(countries);
        });
    }
    getCountriesData();
  }, []);


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        setCountryInfo(data);

      });
    console.log("sdfsdfsdfsd", countryInfo)

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
          <InfoBox title="Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />

          <InfoBox title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />

          <InfoBox title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />

        </div>
        <Map 
        center={center}
        zoom={zoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3> Live cases by country</h3>
          <Table countries={tableData} />
          <h3> Worldwide cases by country</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
