const express = require('express');

const router = express.Router();

const authController = require('../../controllers/api/authentication');

router.post('/api/login', authController.postLogin);

module.exports = router;
