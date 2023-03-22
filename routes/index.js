const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


console.log('started routing');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));

module.exports = router;