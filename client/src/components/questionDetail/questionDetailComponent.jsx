import React, {useState, useEffect} from 'react';
import {question} from '../../redux/question/questionSelector';
import {connect} from 'react-redux';
import CommentComponent from '../comment/commentComponent';
import {addToFavorite} from '../../api/index';
import {fetchUser} from '../../redux/user/userActions';
import {getUserSelector, getUserProblemset} from '../../redux/user/userSelector';
import {postComment} from '../../api/index';
import {fetchQuestion} from '../../redux/question/questionAction.js';

import './question.scss';

function QuestionDetailComponent({question,fetchUser, user, fetchQuestion, problemset}) {

    const [form, setform] = useState({
        text: '',
    });

    const [isfav, setisfav] = useState(false);

    useEffect(() => {
        let favList = problemset?.find(el => el.name === 'Favorite');
        const res = favList?.list?.find(el => el.link === question.link);
        res ? setisfav(true) : setisfav(false);
        console.log(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemset,question]);

    const handleClick = async (question) => {
        const data = {
            link: question.link,
            topic: question.topic,
            title: question.title
        }
    
        try{
            await addToFavorite(data);
            fetchUser();
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };
    
    const handleChange = (e) => {
        setform({
            text: e.target.value,
        });
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await postComment(question.id, {...form});
            setform({text:''});
            fetchQuestion(question.index);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className="question">
            <h3>{question?.title}</h3>
            <a href = {question?.link} target = '_blank' rel="noreferrer">Click Here</a>
            {   
                user ?
                    isfav ? null :
                        <button className = 'btn btn-primary btn-sm' onClick = {(e) => { e.preventDefault(); return handleClick(question)}} >Add to Favorite</button>
                :
                    null
            }
            <br/><br/>
            <form onSubmit={handleSubmit}>
                <textarea name="text" value = {form.text} className="form-control" id="#comment" placeholder="Type comment here..." onChange={handleChange} rows="3" required/>
                <input type="submit" className = "btn btn-primary btn-sm"/>
            </form>
            <CommentComponent comments = {question.comments} user={user} idx = {question.index}/>
        </div>
    )
};

const mapStateToProps = (state)=>({
    question : question(state),
    user: getUserSelector(state),
    problemset: getUserProblemset(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailComponent);