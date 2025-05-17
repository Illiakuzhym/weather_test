const cron = require('node-cron');
const { updateWeather } = require('./weatherUpdater');

function initCrons() {
  cron.schedule('36 * * * *', async () => {
    console.log('⏰ Запуск оновлення погоди...');
    await updateWeather();
  });
}

module.exports = { initCrons };
