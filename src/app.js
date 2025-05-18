const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // html form submissions

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./routes/citySearch'));
app.use('/api', require('./routes/weather'));
app.use('/api', require('./routes/subscriptions'));

module.exports = app;
