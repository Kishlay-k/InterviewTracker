import React from 'react'
import {question} from '../../redux/question/questionSelector';
import {connect} from 'react-redux';
import CommentComponent from '../comment/commentComponent';
import {addToFavorite} from '../../api/index';
import { addAList } from '../../redux/user/userActions';
import {getUserSelector} from '../../redux/user/userSelector';

const handleClick = async (question,addAList) => {
    const data = {
        link: question.link,
        topic: question.topic,
        title: question.title
    }

    try{
        const res = await addToFavorite(data);
        addAList(res.data.problemsets);
    }catch (err) {
        alert(err.response?.data?.message);
    }
};

function QuestionDetailComponent({question,addAList,user}) {
    return (
        <div>
        <h3>{question?.title}</h3>
        <a href = {question?.link} target = '_blank' rel="noreferrer">Click Here</a>
        {
            <button className = 'btn btn-primary' onClick = {(e) => { e.preventDefault(); return handleClick(question,addAList)}} >Add to Favorite</button>
        }
        
        <CommentComponent comments = {question.comments}/>  
    </div>
    )
};

const mapStateToProps = (state)=>({
    question : question(state),
    user: getUserSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    addAList: (data) => dispatch(addAList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailComponent);