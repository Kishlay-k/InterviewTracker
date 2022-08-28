const mongoose = require('mongoose')
const express = require('express')
const app = express()
const problemSet = require('./models/problemSetModel')
const authRouter = require('./routes/authenticationRoutes')
app.set('view engine', 'ejs')
app.use(express.json())
app.use('/', authRouter)
app.get('/', (req, res) => {
    res.render('home')
})
app.use((req, res) => {
    res.status(404).render('404')
})
module.exports = app