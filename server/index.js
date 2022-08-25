const { request } = require('express');
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send("<h2>Just getting started</h2>")
})
app.post('/', (req, res) => {
    console.log(req.body)
    res.send("Recieved a post request")
})

app.listen(port, () => {
    console.log('Hehe Welcome to port no. ' + port)
})