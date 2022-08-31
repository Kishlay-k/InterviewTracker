import React from 'react';

export default function Question({ question }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-auto me-auto">{question.index}</div>
            <div className="ms-auto me-auto">
                <div className="fw-bold">{ question.title }</div>
            </div>
            <span className="badge bg-light rounded-pill">{ question.comments.length }</span>
        </li>
    )
}
