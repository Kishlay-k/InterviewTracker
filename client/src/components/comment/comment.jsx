import React from 'react';
import './comment.scss';

export default function Comment({comment}) {
    console.log(comment);
    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-start">
                <div className="user d-flex flex-row align-items-start"> <img src={`http://localhost:4000/images/user/${comment.user.photo}`} width="30" className="user-img rounded-circle mr-2" alt = '' /> <span><small className="font-weight-bold text-primary">{comment.user.username}</small><br/> <small className="font-weight-bold">{comment.text}</small></span> </div> <small className = "date">{comment.date}</small>
            </div>
        </div>
    );
};


