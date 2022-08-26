const mongoose = require('mongoose')
const express = require('express')
const app = express()
const problemSet = require('./models/problemSetModel')
const authRouter = require('./routes/authenticationRoutes')
app.use(express.json())
app.use('/', authRouter)


module.exports = app