const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Welcome!'
    })
})

app.listen(port,()=>{
    console.log('Hehe Welcome to port no. ' + port)
})