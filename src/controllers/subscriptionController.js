const Joi = require('joi');
const { v4: uuid } = require('uuid');
const { Subscription } = require('../../models');
const { sendMailConfirm, sendMailAlreadySubscribed } = require('../mailer');

const subSchema = Joi.object({
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  frequency: Joi.string().valid('hourly', 'daily').required()
});

// POST /api/subscribe
exports.subscribe = async (req, res) => {
  const { error, value } = subSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const [sub, created] = await Subscription.findOrCreate({
    where: { email: value.email, city: value.city },
    defaults: { ...value, token: uuid() }
  });

  if (!created) {
    await sendMailAlreadySubscribed(sub.email, sub.token);
    return res.status(409).json({ message: 'Email already subscribed' });
  }

  await sendMailConfirm(sub.email, sub.token);
  res.status(200).json({ message: 'Subscription successful. Confirmation email sent.' });
};

// GET /api/confirm/{token}
exports.confirmSubscription = async (req, res) => {
  const { token } = req.params;
  const sub = await Subscription.findOne({ where: { token } });
  if (!sub) return res.status(404).json({ error: 'Token not found' });

  if (!sub.confirmed) await sub.update({ confirmed: true });
  res.json({ message: 'Subscription confirmed successfully' });
};

// GET /api/unsubscribe/{token}
exports.unsubscribe = async (req, res) => {
  const { token } = req.params;
  const deleted = await Subscription.destroy({ where: { token } });
  if (!deleted) return res.status(404).json({ error: 'Token not found' });

  res.json({ message: 'Unsubscribed successfully' });
};
