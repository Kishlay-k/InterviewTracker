const User = require('../models/userModel')

exports.signUp = (req, res) => {
    res.status(200).send('<h3> SignUp </h3>');
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            user: user
        })
    } catch (err) {
        console.log(err);
        req.status(400).json({
            message: "err",
            err: err
        })
    }
}

exports.logIn = (req, res) => {
    res.status(200).send('<h3> LogIn </h3>');
}
exports.logOut = (req, res) => {
    res.status(200).send('<h3> LogOut </h3>');
}