const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendEmail = require('./../email')
const crypto = require('crypto')

exports.signUp = (req, res) => {
    res.render('signup')
}

exports.createUser = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        let token
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*24*7})
        res.status(201).json({
            user: user,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "err",
            err: err
        })
    }
}

exports.logIn = (req, res) => {
    res.render('login')
}
exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!req.body.username || !req.body.password) {
        res.status(400).json({
            message: "Enter All Details",
        })
    }
    let user
    try {
        user = await User.findOne({ username }).select('+password')
        const flag = await bcrypt.compare(password, user.password)
        if (!flag) {
            throw new Error({ message: "test" })
        }
        let token
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3*24*3600*1000 });
        res.status(201).json({
            token
        })
    } catch (err) {
        res.status(404).json({
            message: "Username or Password Incorrect",
            err: err
        })
    }
}
exports.logOut = (req, res) => {
    res.status(200).send('<h3> LogOut </h3>')
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
exports.forgotPassword = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({
            message: "Username not found",
        })
    }
    let user

    try {
        user = await User.findOne({ username: req.body.username })
        const token = user.createPasswordResetToken()
        await user.save({ validateBeforeSave: false })
        await sendEmail({
            email: user.email,
            subject: 'Reset password',
            message: `Your token is ${token}`,
        })

        res.status(201).json({
            message: "mail sent",
        })

    } catch (err) {
        if (user) {
            user.passwordResetToken = undefined
            await user.save({ validateBeforeSave: false })
        }
        res.status(400).json({
            message: "Username not found or Email not sent",
            err: err
        })
    }
}

exports.resetPassword = async (req, res) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')
    try {
        const user = await User.findOne({ passwordResetToken: hashedToken })
        user.password = req.body.password
        user.confirmPassword = req.body.passwordConfirm
        user.passwordResetToken = undefined
        await user.save()
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({
            token
        })


    } catch (err) {
        res.status(400).json({
            err: err
        })
    }
}
exports.protect = async (req, res) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        res.status(400).json({
            message: "Please Login In"
        })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.id)
            if (user.passwordChanged(decode.iat)) {
                throw new Error()
            }
            else {
                req.user = user
                next()
            }
        } catch (err) {
            res.status(200).json({
                message: "Invalid User"
            })
        }
    }
}

exports.changePassword = async (req, res) => {

    if (!req.body.newPassword || !req.body.newPasswordConfirm || !req.body.password) {
        res.status(401).json({
            message: "Missing fields"
        })
    }

    let user
    try {
        user = await User.findById(req.user.id).select('+password')
    } catch (err) {
        res.status(401).json({
            message: "please login"
        })
    }

    let flag
    flag = await bcrypt.compare(req.body.password, user.password)

    if (flag) {
        user.password = req.body.newPassword
        user.confirmPassword = req.body.newPasswordConfirm
        await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({
            token: token
        })
    } else {
        res.status(401).json({
            message: "Incorrect Password"
        })
    }
} 