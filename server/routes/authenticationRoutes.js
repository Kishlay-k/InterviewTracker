const express = require('express')
const authController = require('../controllers/authenticationController')
const authRouter = express.Router()
authRouter.route('/signUp').get(authController.signUp)
authRouter.route('/logIn').get(authController.logIn)
authRouter.route('/logOut').get(authController.logOut)
module.exports = authRouter