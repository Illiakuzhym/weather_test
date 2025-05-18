// routes/citySearch.js
const router = require('express').Router();
const { searchCities } = require('../controllers/citySearchController');

router.get('/cities', searchCities);

module.exports = router;
