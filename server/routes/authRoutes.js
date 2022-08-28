const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/login', authController.logIn);
// router.post('/forgotpassword', authController.forgotPassword);
router.post('/signup', authController.signUp);
router.post('/changepassword', authController.isLoggedIn, authController.changePassword);
router.post('/logout', authController.isLoggedIn, authController.logOut);


module.exports = router;