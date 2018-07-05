var express = require('express');

var router = express.Router();
var SubscriberController = require('../controllers/SubscriberController');
/* GET users listing. */
router.post('/add', SubscriberController.addSubscriber);
router.get('/unsubscribe/:email', SubscriberController.deleteSubscriber);
router.get('/notify', SubscriberController.sendNotification);
// router.get('/view', SubscriberController.getSubscribers);

module.exports = router;