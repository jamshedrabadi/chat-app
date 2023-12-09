const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat } =
    require('../controllers/chat.controller.js');
const { authenticateUser } = require('../middlewares/auth.middleware.js');

router.get('/', authenticateUser, fetchChats);
router.post('/', authenticateUser, accessChat);
router.post('/create-group', authenticateUser, createGroupChat);
router.put('/rename-group', authenticateUser, renameGroupChat);
router.put('/add-to-group', authenticateUser, addToGroupChat);
router.put('/remove-from-group', authenticateUser, removeFromGroupChat);

module.exports = router;
