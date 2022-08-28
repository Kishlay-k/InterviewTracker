const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/login', authController.logIn);
router.post('/logout', authController.logOut);
router.post('/signup', authController.signUp);
router.post('/changepassword', authController.changePassword);
router.post('/forgotpassword', authController.forgotPassword);

module.exports = router;