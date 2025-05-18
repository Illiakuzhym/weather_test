const router = require('express').Router();
const {
  subscribe,
  confirmSubscription,
  unsubscribe
} = require('../controllers/subscriptionController');

router.post('/subscribe', subscribe);             
router.get('/confirm/:token', confirmSubscription); 
router.get('/unsubscribe/:token', unsubscribe);     

module.exports = router;
