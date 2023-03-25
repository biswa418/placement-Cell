const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewController = require('../controllers/interviewController');

router.get('/show-details/:id', interviewController.show);
router.post('/edit-details/:id', interviewController.edit);
router.get('/addInterview', interviewController.add);
router.post('/createInterview', interviewController.create);
router.get('/removeInterview/:id', passport.authenticate('local', { failureRedirect: '/users/sign-in' }), interviewController.remove);

module.exports = router;