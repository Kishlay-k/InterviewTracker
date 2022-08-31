import React from 'react';
import {Link,withRouter} from 'react-router-dom';

function Question({ question,history,match }) {
    const color = '#f8f9fa';

    const colorChange = (e)=>{
        e.target.closest('li').style.background = color;
    }

    const colorChange2 = (e)=>{
        e.target.closest('li').style.background = '';
    }

 
    return (
        <li className= "list-group-item d-flex align-items-start pt-1 pb-1 row" onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)}>
            <div className ='col-1' onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)} >{question.index}.</div>
            <Link to ={`/${question.index}`} style={{textDecoration: 'none'} }><div onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)}>
                <div className="fw-bold">{ question.title }</div>
            </div>
            </Link>
            <span className="badge bg-light rounded-pill ml-auto" onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)}>{ question.comments.length }</span>
        </li>
    )
}

export default withRouter(Question);
