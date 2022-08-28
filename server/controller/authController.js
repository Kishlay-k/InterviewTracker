const Err = require('../utility/error');
const User = require('../models/userModel');
const aEH = require('../utility/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtToCookie = (user, status, res) => {
    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    user.password = undefined;
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    res.status(status).json({
        status: "Success",
        token,
        data: { user }
    });
}

exports.signUp = aEH(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) next(new Err("Passwords do not match"));
    const newUser = await User.create({ username, password, email });
    jwtToCookie(newUser, 201, res);
});

exports.logIn = aEH(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (user && await bcrypt.compare(password, user.password)) jwtToCookie(user, 200, res);
    else next(new Err('Username or password invalid', 400));
});

exports.logOut = (req, res, next) => {
    res.cookie('jwt', '');
    res.status(200).json({
        messsage: "Logged Out"
    });
}

exports.forgotPassword = (req, res, next) => {
    res.status(200).json({
        messsage: "Changed Password"
    });
}

exports.changePassword = (req, res, next) => {
    res.status(200).json({
        messsage: "Password Changed"
    });
} 