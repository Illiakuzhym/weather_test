// src/controllers/citySearchController.js
const axios = require('axios');
require('dotenv').config();

exports.searchCities = async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: 'query is required' });

  try {
    const response = await axios.get('http://api.weatherapi.com/v1/search.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: query
      }
    });

    const results = response.data.map(c => ({
      name: c.name,
      region: c.region,
      country: c.country
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'City search failed' });
  }
};
