const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/auth.middleware.js');
const { registerUser, loginUser, searchUsers } = require('../controllers/user.controller.js');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', authenticateUser, searchUsers);

module.exports = router;
