// conversationsRoutes.js
const express = require('express');
const router = express.Router();
const conversationsController = require('../controllers/conversationsController');

router.get('/:userId/conversations', conversationsController.getUserConversations);
router.post('/send', conversationsController.sendMessage);
router.post('/start', conversationsController.startConversation);

module.exports = router;
