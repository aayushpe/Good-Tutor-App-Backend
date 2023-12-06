// conversationsRoutes.js
const express = require('express');
const router = express.Router();
const conversationsController = require('../controllers/conversationsController');
const { getUsername } = require('../controllers/conversationsController');

router.get('/:userId/conversations', conversationsController.getUserConversations);
router.get('/username/:userId', getUsername);
router.post('/send', conversationsController.sendMessage);
router.post('/start', conversationsController.startConversation);

module.exports = router;
