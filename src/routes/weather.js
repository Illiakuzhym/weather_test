const router = require('express').Router();
const { getWeather } = require('../controllers/weatherController');

router.get('/weather', getWeather);      
module.exports = router;
