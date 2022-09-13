import React from 'react';
import {deleteComment} from '../../api/index';
import {fetchQuestion} from '../../redux/question/questionAction.js';
import {connect} from 'react-redux';

import './comment.scss';

function Comment({comment, user, fetchQuestion, idx}) {

    const onDeleteComment = async() => {
        try {
            await deleteComment(comment._id);
            fetchQuestion(idx);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-start">
                <div className="user d-flex flex-row align-items-start"> 
                    <img src={`http://localhost:4000/images/user/${comment.user.photo}`} width="30" className="user-img rounded-circle mr-2" alt = '' /> 
                    <span>
                        <small className="font-weight-bold text-primary">{comment.user.username}</small>
                        <br/>
                        <small className="font-weight-bold">{comment.text}</small>
                    </span> 
                </div> 
                <small className = "date">{comment.date}</small>
                {
                    user._id === comment.user._id ?
                        <button type="button" className="close" aria-label="Close"><span aria-hidden="true" style = {{cursor: 'pointer'}} onClick={onDeleteComment}>x</span></button>
                    :
                        null
                }
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
});

export default connect(null, mapDispatchToProps)(Comment);