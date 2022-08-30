const Err = require('../utility/error');
const Question = require('../models/questionModel');
const aEH = require('../utility/asyncErrorHandler');

exports.getAllQuestions = aEH(async (req, res, next) => {
    // let query = Question.find();
    let page, limit, skip;
    page = req.query.page*1 || 1;
    limit = req.query.num*1 || 50;
    skip = (page-1) * limit;
    let query = Question.find().skip(skip).limit(limit);
    const question = await query;
    console.log(req.query);
    res.status(200).json({
        status: 'success',
        num: question.length,
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