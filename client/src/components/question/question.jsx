import React from 'react';

export default function Question({ question }) {
    return (
        <div className = 'problem'>
            <div>
            <h4 className = 'title'>{ question.title }</h4>
            </div>
            <div>
            <span className = 'comment-count'>{question.comments.length}</span>
            </div>
        </div>
      
    )
}
