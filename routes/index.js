const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const downloadController = require('../controllers/downloadController');


console.log('started routing');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));
router.get('/download', downloadController.downloadReport);

module.exports = router;