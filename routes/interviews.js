const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.get('/show-details/:id', interviewController.show);
router.get('/edit-details/:id', interviewController.edit);
router.get('/addInterview', interviewController.add);


module.exports = router;