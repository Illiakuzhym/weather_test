const nodemailer = require('nodemailer');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_FROM, pass: process.env.EMAIL_APP_PASS }
});

exports.sendMailConfirm = (to, token) =>
  transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Confirm your weather subscription',
    html: `Перейдіть за посиланням, щоб підтвердити:<br>
           <a href="${BASE_URL}/api/confirm/${token}">${BASE_URL}/api/confirm/${token}</a>`
  });

exports.sendMailAlreadySubscribed = (to, token) =>
  transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Already subscribed',
    html: `Ви вже підписані. Якщо хочете відписатись:<br>
           <a href="${BASE_URL}/api/unsubscribe/${token}">${BASE_URL}/api/unsubscribe/${token}</a>`
  });
