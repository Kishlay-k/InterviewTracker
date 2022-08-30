const User = require('../models/userModel');
const aEH = require('../utility/asyncErrorHandler');
const Err = require('../utility/error');
const Question = require('../models/questionModel');

exports.getAllUsers = aEH(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        users
    });
});

exports.getUser = aEH(async (req, res, next) => {
    const user = await User.findOne( {username: req.params.username} );
    if(!user) return next(new Err('User does not exist', 400));
    res.status(200).json({
        status: 'success',
        user
    });
});

exports.updateSolved = aEH(async (req, res, next) => {
    let qid = req.params.questionid;
    const question = await Question.findById(qid);
    if(!question) {
        return next(new Err('Invalid Question ID', 400));
    }
    let solved = req.user.solved;
    if (solved.find(e => e == qid)) {
        solved = solved.filter(e => e != qid);
    } else {
        solved.push(qid);
    }
    await User.findByIdAndUpdate(req.user.id, {solved} );
    res.status(200).json({
        status: 'success'
    });
});