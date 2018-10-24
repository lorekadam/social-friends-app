const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.get('/api/getUser', authController.getUser);
router.post('/api/refreshToken', authController.refreshToken);

module.exports = router;
