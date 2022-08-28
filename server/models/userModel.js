const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter Username"],
        unique: [true, "Username taken."]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minLength: 8,
        select: false
    },
    email: {
        type: String,
        required: [true, "Enter Email"],
        unique: [true, "Email exists in DB"],
        validate: [validator.isEmail, "Enter valid Email"]
    },
    photo: {
        type: String,
        default: "default.jpg"
    },
    passwordChangeTime: Date,
    passwordChangeToken: String
    //isSolved
});
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
const User = mongoose.model('user', userSchema);
module.exports = User;