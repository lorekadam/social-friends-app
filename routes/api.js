const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/api/createUser', authController.createUser);

module.exports = router;
