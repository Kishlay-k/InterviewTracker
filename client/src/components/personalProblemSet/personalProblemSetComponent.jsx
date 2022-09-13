import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import ProblemSetListComponent from './problemSetListComponent';
import ProblemSetItem from './problemSetItem';
import {addList} from '../../api/index';
import CreateProblemset from './createProblemset';
import {fetchUser} from '../../redux/user/userActions';
import ModalWrapper from './../modal/modal';
import {getUserSelector, getUserProblemset} from '../../redux/user/userSelector';

import './list.scss';

const Modal = ModalWrapper(CreateProblemset);

const PersonalProblemSetComponent = ({user, fetchUser, problemset}) => {

    const loc  = useLocation();
    const history = useHistory();
    let val = queryString.parse(loc.search);

    const [modalShow1,setShowModal1] = useState(false);

    const [formData,setFormData] = useState({
        name: '',
    });
    const handleChange = (e)=>{
        setFormData({
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
           await addList(formData);
           fetchUser();
            setShowModal1((e) => !e);
            setFormData({
                name: '',
            });
        } catch(err){
            alert(err.response?.data?.message);
        }
    }

    const func = (name) =>{
        history.push(`${loc.pathname}?name=${name}`)
    };
    let playlist = {};
    
    if(user){
        playlist = user.problemsets.find(el => el.name === val.name) || [];
    }
    return (
        <div className="personal-problemset">
            <h4 className="ml-3">My list</h4>
            <div  className = "problemset-container">
                <div className="playlists">
                    {
                        user ? 
                            problemset.map(e => (
                                <ProblemSetItem key = {e._id} func = {func} el = {e}/>
                            ))
                        :
                            null
                    }
                    { modalShow1 ? null : <button onClick={() => setShowModal1(true)}  className="btn btn-primary mt-3">Add List</button> }
                    <Modal onHide={() => setShowModal1(false)} show = {modalShow1} handleSubmit = {handleSubmit} handleChange = {handleChange} {...formData}/>
                </div>
                <div className = "list">
                    { (user && val.name) ? <ProblemSetListComponent playlist={playlist} /> : null }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) =>({
    user: getUserSelector(state),
    problemset: getUserProblemset(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser : () => dispatch(fetchUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProblemSetComponent);
