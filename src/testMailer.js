const { sendWeatherEmail } = require('./mailer');

sendWeatherEmail(
  'illiakuzhim@gmail.com', // куди надіслати
  'Kyiv',
  'Сонячноwfgw',
  22
).catch(console.error);
