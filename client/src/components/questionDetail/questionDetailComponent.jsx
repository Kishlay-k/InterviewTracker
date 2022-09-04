import React from 'react'
import {question} from '../../redux/question/questionSelector';
import {connect} from 'react-redux';
import CommentComponent from '../comment/commentComponent';

function QuestionDetailComponent({question}) {
    return (
        <div>
        <h3>{question?.title}</h3>
        <a href = {question?.link} target = '_blank' rel="noreferrer">Click Here</a>
        <CommentComponent comments = {question.comments}/>  
    </div>
    )
};

const mapStateToProps = (state)=>({
    question : question(state),
});

export default connect(mapStateToProps)(QuestionDetailComponent);