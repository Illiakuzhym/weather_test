const express = require('express');
const router = express.Router();
const {
  subscribe,
  unsubscribe,
  listSubscriptions,
} = require('../controllers/subscriptionController');

router.post('/subscribe', subscribe);
router.delete('/unsubscribe/:id', unsubscribe);
router.get('/subscriptions', listSubscriptions); // Тестовий маршрут

module.exports = router;
