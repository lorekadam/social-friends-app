const express = require('express');
const homeController = require('../controllers/home');
const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/', homeController.index);
router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);

module.exports = router;
