import React from 'react';
import Comment from './comment';

const EmptyComponent = ()=>(
    <p>No Comments yet.</p>
);

function CommentComponent({comments}) {
    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Comments</h5>
                    </div>
                    {
                        comments.length > 0 ? 
                        comments.map((el,i)=>(
                            <Comment key = {i} comment = {el} />
                        )) : <EmptyComponent/>
                    }
                </div>
            </div>
        </div>
    )
};

export default CommentComponent;
