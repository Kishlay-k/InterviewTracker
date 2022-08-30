const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.use(authController.isLoggedIn);
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUser);
router.post('/updatesolved/:questionid', userController.updateSolved);
router.post('/createproblemset', userController.createProblemSet);
router.post('/addproblem/:id', userController.addToProblemSet);
// router.post('/like/:id', userController.likeProblemSet);

module.exports = router; 