const { Subscription } = require('../models');
const { getWeather } = require('./weather-api');
const { sendWeatherEmail } = require('./mailer');

async function updateWeather() {
  const subs = await Subscription.findAll();

  for (const sub of subs) {
    const data = await getWeather(sub.city);

    if (data) {
      await sendWeatherEmail(sub.email, data.city, data.condition, data.temp);
    }
  }
}

module.exports = { updateWeather };

// Для ручного запуску:
if (require.main === module) {
  updateWeather();
}
