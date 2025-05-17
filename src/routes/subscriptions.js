const router = require('express').Router();
const {
  subscribe,
  confirmSubscription,
  unsubscribe
} = require('../controllers/subscriptionController');

router.post('/subscribe', subscribe);             // POST /api/subscribe
router.get('/confirm/:token', confirmSubscription); // GET /api/confirm/{token}
router.get('/unsubscribe/:token', unsubscribe);     // GET /api/unsubscribe/{token}

module.exports = router;
