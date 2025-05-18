const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;

async function getWeatherApi(city) {
  try {
    const res = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: API_KEY,
        q: city,
        lang: 'uk'
      }
    });

    const data = res.data;
    return {
      city: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      humidity: data.current.humidity,
      condition: data.current.condition.text
    };
  } catch (error) {
    console.error(`Error getting weather for ${city}:`, error.message);
    return null;
  }
}

module.exports = { getWeatherApi };
