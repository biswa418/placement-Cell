const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controllers/studentController');

router.get('/show-details/:id', studentController.show);
router.get('/edit-details/:id', studentController.edit);
router.get('/addStudent', studentController.add);
router.post('/createStudent', studentController.create);
router.get('/removeStudent/:id', studentController.remove);
router.post('/updateStudent/:id', studentController.update);

module.exports = router;