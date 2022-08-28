const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter Username"]  
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minLength: 8,
        select: false
    },
    email: {
        type: String,
        required: [true, "Enter Email"]
    },
    photo: {
        type: String,
        default: "default.jpg"
    },
    passwordChangeTime: Date,
    passwordChangeToken: String
    //isSolved
});
const User = mongoose.model('user', userSchema);
module.exports = User; 