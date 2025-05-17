const router = require('express').Router();
const { getWeather } = require('../controllers/weatherController');

router.get('/weather', getWeather);       // GET /api/weather?city=
module.exports = router;
