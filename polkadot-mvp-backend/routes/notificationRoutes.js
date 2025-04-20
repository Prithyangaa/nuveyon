const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications, markNotificationAsRead} = require('../controllers/notificationController');

router.post('/send', sendNotification);
router.get('/:polkadotId', getNotifications);
router.patch('/:id/read', markNotificationAsRead);

module.exports = router;
