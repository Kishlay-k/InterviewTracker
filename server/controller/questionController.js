const Err = require('../utility/error');
const Question = require('../models/questionModel');
const aEH = require('../utility/asyncErrorHandler');

exports.getAllQuestions = aEH(async (req, res, next) => {
    let page, limit, skip;
    page = req.query.page*1 || 1;
    limit = req.query.num*1 || 50;
    skip = (page-1) * limit;
    let query = Question.find().skip(skip).limit(limit).populate({ path: 'comments' });
    const question = await query;
    res.status(200).json({
        status: 'success',
        num: question.length,
        data: { question }
    });
});

exports.topicWiseQuestions = aEH(async (req, res, next) => {
    const { topic } = req.params;
    const questions = await Question.find({ topic });
    res.status(200).json({
        status: 'success',
        data: { questions }

    });
});

exports.getQuestion = aEH(async (req,res,next)=>{
    const id = req.params.id;
    const question = await Question.findById(id).populate({ path: 'comments' });

    res.status(200).json({
        status: 'success',
        data: { question },
    });
})

