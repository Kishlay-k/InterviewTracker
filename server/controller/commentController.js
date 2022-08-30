const Err = require('../utility/error');
const Comment = require('../models/commentModel');
const aEH = require('../utility/asyncErrorHandler');
const Question = require('../models/questionModel');

exports.comment = aEH(async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.params;
    const { user } = req;
    if(!text) return next(new Err('Comment text is required'));
    const comment = await Comment.create({ text, question: id, user: user.id });
    res.status(200).json({
        status: 'success',
        comment
    })
});
