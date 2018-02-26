const express = require('express');

const router = express.Router();

const apiController = require('../controllers/api');

router.post('/api/login', apiController.postLogin);

module.exports = router;
