import React, {useEffect, useState} from 'react';
import weatherService from "../services/weatherService.js";

function WeatherInfo({country}) {
  const [weatherData, setWeatherData] = useState(null)

  // when country changes, fetch weather data
  useEffect(() => {
    weatherService
      .getWeatherByLatLong({
        latitude: country.capitalInfo.latlng[0],
        longitude: country.capitalInfo.latlng[1]
      })
      .then(weatherData => {
        setWeatherData(weatherData)
      })
  }, [country])

  const temperature = weatherData ? weatherData.temperature : null
  const wind = weatherData ? weatherData.wind : null
  const icon = weatherData ? weatherData.icon : null

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <span>Temperature {temperature}</span><br/>
      <img src={icon}/><br/>
      <span>Wind {wind}</span>
    </div>
  );
}

export default WeatherInfo;


