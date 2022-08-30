const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');

router.get('/allquestions', questionController.getAllQuestions);
router.get('/:topic', questionController.topicWiseQuestions);

module.exports = router; 