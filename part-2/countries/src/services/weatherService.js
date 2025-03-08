import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m,weather_code'
import weatherCodeData from '../weatherCodes.json'

const getWeatherByLatLong = async ({ latitude, longitude }) => {
  const response = (await axios.get(
    baseUrl +
    `&latitude=${latitude}` +
    `&longitude=${longitude}`
  )).data

  return {
    temperature: `${response.current.temperature_2m} ${response.current_units.temperature_2m}`,
    wind: `${response.current.wind_speed_10m} ${response.current_units.wind_speed_10m}`,
    icon: weatherCodeData[`${response.current.weather_code}`]["day"]["image"]
  }
}

export default { getWeatherByLatLong }