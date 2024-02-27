const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/Weather');

router.post('/weather', WeatherController.Sun);

module.exports = router;