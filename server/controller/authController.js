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
        status: 'Success',
        token,
        data: { user }
    });
}

exports.signUp = aEH(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if(password !== confirmPassword) next(new Err('Passwords do not match'));
    const newUser = await User.create({ username, password, email });
    jwtToCookie(newUser, 201, res);
});

exports.logIn = aEH(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if(user && await bcrypt.compare(password, user.password)) jwtToCookie(user, 200, res);
    else next(new Err('Username or password invalid', 400));
});

// exports.forgotPassword = (req, res, next) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if(!user) next(new Err('Enter valid Email'));
// }

exports.isLoggedIn = aEH(async (req, res, next) => {
    let token;
    if (req.headers.Authorization && req.headers.Authorization.startsWith('Bearer')) {
        token = req.headers.Authorization.split(' ')[1];
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if(!token) return next(new Err('Not Logged In'), 400);
    let jsonPayload = await jwt.verify(token, process.env.SECRETKEY); 
    const user = await User.findById(jsonPayload.id);
    if(!user) return next(new Err("User does not exist", 400));
    req.user = user;
    next();
});

exports.changePassword = aEH(async (req, res, next) => {
    const { currPassword, newPassword, confirmNP } = req.body;
    if(newPassword !== confirmNP) next(new Err('Passwords do not match'), 400);
    const user = await User.findById(req.user.id).select('+password');
    if(await bcrypt.compare(newPassword, user.password)) next(new Err('New Password cannot be Old Password'), 400);
    if(await bcrypt.compare(currPassword, user.password)) {
        user.password = newPassword;
        await user.save();
    }
    jwtToCookie(user, 200, res);
});

exports.logOut = (req, res, next) => {
    res.cookie('jwt', '');
    res.status(200).json({
        messsage: 'Logged Out'
    });
}