const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.get('/show-details/:id', interviewController.show);
router.post('/edit-details/:id', interviewController.edit);
router.get('/addInterview', interviewController.add);
router.post('/createInterview', interviewController.create);
router.get('/removeInterview/:id', interviewController.remove);

module.exports = router;