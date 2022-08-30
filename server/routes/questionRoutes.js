const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');
const commentController = require('../controller/commentController')
const authController = require('../controller/authController');

router.get('/all/', questionController.getAllQuestions);
router.get('/topicwise/:topic', questionController.topicWiseQuestions);
router.get('/:id', questionController.getQuestion);
router.post('/:id/comment', authController.isLoggedIn, commentController.comment);

module.exports = router; 