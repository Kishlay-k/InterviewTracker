exports.signUp = (req, res, next) => {
    res.status(200).json({
        messsage: "Signed Up"
    });
}

exports.logIn = (req, res, next) => {
    res.status(200).json({
        messsage: "Logged In"
    });
}

exports.logOut = (req, res, next) => {
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