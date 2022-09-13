import React from 'react';
import Comment from './comment';

const EmptyComponent = ()=>(
    <p>No Comments yet.</p>
);

function CommentComponent({comments, user, idx}) {
    let cmt = [...comments];
    cmt.reverse();
    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Comments</h5>
                    </div>
                    {   
                        cmt.length > 0 ? 
                        cmt.map((el,i)=>(
                            <Comment key = {i} comment = {el} user = {user} idx = {idx}/>
                        )) : <EmptyComponent/>
                    }
                </div>
            </div>
        </div>
    )
};

export default CommentComponent;
