const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.get('/',commentController.getAllComment);
router.get('/:id',commentController.getComment);

module.exports = router;