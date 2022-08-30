const User = require('../models/userModel');
const aEH = require('../utility/asyncErrorHandler');
const Err = require('../utility/error');
const Question = require('../models/questionModel');
const { ProblemSet, Problem } = require('../models/personalProblemSetModel');

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

exports.createProblemSet = aEH(async (req, res, next) => {
    const { name, public, description } = req.body;
    if(!name) return next(new Err('Enter Name', 400));
    const user = req.user;
    const problemSet = await ProblemSet.create({ name, public, description });
    let arr = user.problemsets || [];
    arr.push(problemSet.id);
    await User.findByIdAndUpdate(user.id, { problemsets: arr});
    res.status(200).json({
        status: 'success',
        problemSet
    });
});

exports.addToProblemSet = aEH(async (req, res, next) => {
    const id = req.params.id;
    const { title, topic, link, description } = req.body;
    if(!link) return next(new Err('Enter Link', 400));
    const problemSet = await ProblemSet.findById(id);
    const problem = await Problem.create({ title, topic, link, description });
    let arr = problemSet.list || [];
    arr.push(problem.id);
    await ProblemSet.findByIdAndUpdate(id, { list: arr});
    res.status(200).json({
        status: 'success',
        problem
    });
});

// exports.likeProblemSet = aEH(async (req, res, next) => {
//     const id = req.params.id;
//     const problemSet = await ProblemSet.findById(id);

// });