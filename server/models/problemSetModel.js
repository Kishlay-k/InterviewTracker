const mongoose = require('mongoose')
const problemSetSchema = new mongoose.Schema({
    Title:{
        type: String,
        reuired: true
    },
    Link:{
        type: String,
        reuired: true
    },
    Solved:{
        type: Boolean,
        reuired: true
    }
})
const problemSet = mongoose.model('problemSet', problemSetSchema)
module.exports = problemSet
