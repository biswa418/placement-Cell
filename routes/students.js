const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/show-details/:id', studentController.show);
router.get('/edit-details/:id', studentController.edit);
router.get('/addStudent', studentController.add);


module.exports = router;