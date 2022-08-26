const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: ["true", "Enter Username"],
        unique: true
    },
    email: {
        type: "string",
        required: ["true", "Enter Email"],
        unique: true
    },
    password: {
        type: "string",
        required: ["true", "Enter Password"],
        minlength: 8
    },
    confirmPassword: {
        type: "string",
        required: ["true", "Confirm Password"],
        minlength: 8
    }
});

const User = mongoose.model('user', userSchema)

module.exports = User;