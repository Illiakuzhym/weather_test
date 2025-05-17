const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // TLS
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_APP_PASS,
  }
});

async function sendWeatherEmail(to, city, condition, temp) {
  const message = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: `Прогноз погоди для ${city}`,
    text: `Оновлений прогноз погоди у місті ${city}:\n\n${condition} temp:${temp}`,
  };

  try {
    let info = await transporter.sendMail(message);
    console.log("✅ Лист надіслано:", info.messageId);
  } catch (error) {
    console.error("❌ Помилка під час надсилання листа:", error);
  }
  
}

module.exports = { sendWeatherEmail };
