const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { default: validator } = require('validator')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: ["true", "Enter Username"],
        unique: true
    },
    email: {
        type: "string",
        required: ["true", "Enter Email"],
        unique: true,
        validate: [validator.isEmail, "Not a valid email"]
    },
    password: {
        type: "string",
        required: ["true", "Enter Password"],
        minlength: 8,
        select: false    // this will not be returned when we get the user
    },
    confirmPassword: {
        type: "string",
        required: ["true", "Confirm Password"],
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password
            }
        },
        message: 'Passwords do not match',
    },
    photo: String,
    passwordResetToken: String,
    passwordChangedAt: String,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next()
    }
    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    return resetToken
}

userSchema.methods.passwordChanged = function (time) {
    if (this.passwordChangedAt) {
        const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return changedAt > time
    }
    return false
}


const User = mongoose.model('user', userSchema)

module.exports = User