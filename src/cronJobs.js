const cron = require('node-cron');
const { Subscription } = require('../models');
const { getWeatherApi } = require('./weather-api');
const { sendWeatherEmail } = require('./mailer');

function initCrons() {
  // Hourly job (щогодини)
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ Hourly weather job running...');
    const subs = await Subscription.findAll({ where: { confirmed: true, frequency: 'hourly' } });

    for (const s of subs) {
      const data = await getWeatherApi(s.city);
      if (!data) continue;
      await sendWeatherEmail(
        s.email,
        s.city,
        `${data.condition}. ${data.temp}°C, humidity ${data.humidity}%`,
        s.token
      );
    }
  });

  // Daily job (щодня о 07:00)
  cron.schedule('0 7 * * *', async () => {
    console.log('📅 Daily weather job running...');
    const subs = await Subscription.findAll({ where: { confirmed: true, frequency: 'daily' } });

    for (const s of subs) {
      const data = await getWeatherApi(s.city);
      if (!data) continue;
      await sendWeatherEmail(
        s.email,
        s.city,
        `${data.condition}. ${data.temp}°C, humidity ${data.humidity}%`,
        s.token
      );
    }
  });

  console.log('✅ Cron jobs initialized (hourly & daily)');
}

module.exports = { initCrons };
