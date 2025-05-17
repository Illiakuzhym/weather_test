const Joi = require('joi');
const { Subscription } = require('../../models');

const schema = Joi.object({
  email: Joi.string().email().required(),
  city: Joi.string().min(2).required()
});

exports.subscribe = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const sub = await Subscription.create(value);
    res.status(201).json(sub);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'You are already subscribed to this city' });
    }else {
      res.status(500).json({ error: error.message });
    }    
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Subscription.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({text: `Subscriptin ${id} is deleted`});
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listSubscriptions = async (req, res) => {
  try {
    const all = await Subscription.findAll();
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
