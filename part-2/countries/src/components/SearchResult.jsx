import React from 'react';
import weatherService from "../services/weatherService.js";
import WeatherInfo from "./WeatherInfo.jsx";

function SearchResult({foundCountries, handleShowButton}) {
  if (foundCountries.length > 10) {
    return (<div>too many matches, specify another filter</div>)
  } else if (foundCountries.length === 1) {
    const country = foundCountries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <span>capital {country.capital}</span><br/>
        <span>area {country.area}</span>
        <h1>Languages</h1>
        <ul>
          {Object.values(country.languages).map((language) => {
            return <li key={language}>{language}</li>
          })}
        </ul>
        <img src={country.flags.png}/>
        <WeatherInfo country={country}/>
      </>
    )
  } else {
    return (
      <div>
        {foundCountries.map((country) => {
          return (
            <span key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowButton({targetCountryName: country.name.common})}>show</button>
              <br/>
            </span>
          )
        })}
      </div>
    )
  }
}

export default SearchResult;