const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'This field cannot be empty']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'question'
    },
    versionKey: false
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;