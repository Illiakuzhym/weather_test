const { getWeatherApi } = require('../weather-api');

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'city required' });

  const data = await getWeatherApi(city);
  if (!data) return res.status(404).json({ error: 'City not found' });

  res.json({
    temperature: data.temp,
    humidity: data.humidity,
    description: data.condition
  });
};
