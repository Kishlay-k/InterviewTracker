const Err = require('../utility/error');
const Question = require('../models/questionModel');
const aEH = require('../utility/asyncErrorHandler');

exports.getAllQuestions = aEH(async (req, res, next) => {
    const question = await Question.find();
    res.status(200).json({
        status: 'success',
        data: { question }

    });
});

exports.topicWiseQuestions = aEH(async (req, res, next) => {
    const { topic } = req.params;
    const question = await Question.find({ topic });
    res.status(200).json({
        status: 'success',
        data: { question }

    });
}); 