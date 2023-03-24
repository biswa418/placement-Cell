const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/show-details/:id', studentController.show);
router.get('/edit-details/:id', studentController.edit);
router.get('/addStudent', studentController.add);
router.post('/createStudent', studentController.create);
router.get('/removeStudent/:id', studentController.remove);

module.exports = router;