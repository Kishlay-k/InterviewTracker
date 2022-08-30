const Err = require('../utility/error');
const User = require('../models/userModel');
const aEH = require('../utility/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utility/sendEmail');
const multer  = require('multer')

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

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('I am running');
        cb(null, 'public/images/user/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        let name;
        // console.log(req.body);
        if(!req.user) {
            name = req.username;
        } else {
            name = req.user.id;
        }
        if(!name) {
            cb(new Err('Something went wrong', 400), false);
        }
        cb(null, `${name}_${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith('image')) {
        cb(new Err('Not an image', 400), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.updatePhoto = upload.single('photo');

exports.updateMe = aEH(async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    let username = req.body.username || req.user.username;
    let email = req.body.email || req.user.email;
    let photo = req.file.filename || req.user.photo;
    await User.findByIdAndUpdate(req.user.id, { email, username, photo });
    res.status(200).json({
        status: 'success'
    });
});

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

exports.forgotPassword = aEH(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return next(new Err('User not found!!',404));

    let token = `${user.id}${Date.now()}${Math.round((Math.random()*10000000))}`;

    user.passwordChangeToken = token;
    await user.save({ validateBeforeSave:false });

    const link = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${token}`;

    try {
        const options = {
            email: user.email,
            subject: 'Reset Password link',
            message: `Click <a href = "${link}">here</a> to reset your Interview Tracker account password. <br> Ignore if you did'nt request a password change.`
        }
        await sendEmail(options);
        res.status(200).json({
            status:'success',
            message: 'Mail sent'
        });
    } catch(err){
        console.log(err);
        user.passwordChangeToken = undefined;
        await user.save({ validateBeforeSave:false });
        return next(new Err('Something went wrong. Please try again later.', 500)); 
    }

});

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

exports.resetPassword = aEH(async (req,res,next)=>{
    const { newPassword, confirmNP } = req.body;
    if(newPassword !== confirmNP) next(new Err('Passwords do not match'), 400);
    console.log(req.params.token);

    const user = await User.findOne({ passwordChangeToken: req.params.token }).select('+passwordChangeToken');

    console.log(user);


    if(!user) return next(new Err('Something went wrong',400));

    user.password = newPassword;
    user.passwordChangeToken = undefined;
    await user.save();

    jwtToCookie(user, 200, res);
    
});

exports.logOut = (req, res, next) => {
    res.cookie('jwt', '');
    res.status(200).json({
        messsage: 'Logged Out'
    });
}