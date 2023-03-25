const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controllers/studentController');

router.get('/show-details/:id', studentController.show);
router.get('/edit-details/:id', studentController.edit);
router.get('/addStudent', studentController.add);
router.post('/createStudent', studentController.create);
router.get('/removeStudent/:id', passport.authenticate('local', { failureRedirect: '/users/sign-in' }), studentController.remove);
router.post('/updateStudent/:id', studentController.update);

module.exports = router;