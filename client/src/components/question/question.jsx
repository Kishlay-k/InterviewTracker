import React, {useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserSelector} from '../../redux/user/userSelector';
import {toggleSolved} from '../../api/index';
import {toggleSolvedAction} from '../../redux/user/userActions';

function Question({ question, user,checked,toggleSolvedAction }) {
    const color = '#f8f9fa';

    let ch = checked ? true:false;

    const toggleState = async(id) =>{
        setState(e => !e);
        try{
            await toggleSolved(id);
            toggleSolvedAction(id);
        } catch(err){
            alert(err.message);
        }
    };

    const[state,setState] =useState(ch);

    const colorChange = (e)=>{
        e.target.closest('li').style.background = color;
    }

    const colorChange2 = (e)=>{
        e.target.closest('li').style.background = '';
    }
 
    return (
        <li className= "list-group-item d-flex pt-1 pb-1" onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)}>
            <div className = "pr-3" onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)} >{question.index}.</div>
            <Link to ={`/problemset/problem/${question.index}`} style={{textDecoration: 'none'} }><div onMouseOver = {(e) => colorChange(e)} onMouseOut = {(e)=> colorChange2(e)}>
                <div className="">{ question.title }</div>
            </div>
            </Link>
            {
                user ?
                 <div className="form-check ml-auto">
                     <input className="form-check-input" type="checkbox" value="" id= {`${question.id}`} onChange={(e) => toggleState(question.id)} checked = {state} />
                 </div> 
                :  
                null
            }
               
        </li>
    )
}

const mapStateToProps = (state) =>({
    user : getUserSelector(state),
});

const mapDispatchToProps = (dispatch) =>({
    toggleSolvedAction: (id) => dispatch(toggleSolvedAction(id)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Question));
