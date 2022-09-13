import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import ProblemSetListComponent from './problemSetListComponent';
import ProblemSetItem from './problemSetItem';
import {addList} from '../../api/index';
import CreateProblemset from './createProblemset';
import {addAList} from '../../redux/user/userActions';
import ModalWrapper from './../modal/modal';
import {getUserSelector, getUserProblemset} from '../../redux/user/userSelector';
import './list.scss';


const Modal = ModalWrapper(CreateProblemset);


function PersonalProblemSetComponent({user,addAList, problemset}) {

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
           const res = await addList(formData);
           addAList(res.data.updatedProblemSet.problemsets);
            setShowModal1((e) => !e);
            setFormData({
                name: '',
            });
        } catch(err){
            alert(err.response?.data?.message);
        }
    }

    const func = (name)=>{
        history.push(`${loc.pathname}?name=${name}`)
    };
    let playlist = {};
    if(user){
        playlist = user.problemsets.find(el => el.name === val.name) || [];
    }
    return (
        <div>
            <h2 className="ml-3">My list</h2>
            <div  className = "d-flex justify-content-start flex-wrap">
                <ol className="playlists">
                {
                    user ? 
                    problemset.map(e => (
                        <ProblemSetItem key = {e._id} func = {func} el = {e}/>
                    ))
                    :
                    null
                }
                {
                    modalShow1 ? null : <button onClick={() => setShowModal1(true)}  className="btn btn-primary mt-3">Add List</button>
                }
                <Modal onHide={() => setShowModal1(false)} show = {modalShow1} handleSubmit = {handleSubmit} handleChange = {handleChange} {...formData}/>
                </ol>
                <div className = "list">
                {
                    (user && val.name) ?
                    <ProblemSetListComponent playlist={playlist} /> : null
                }
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
    addAList: (data) => dispatch(addAList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProblemSetComponent);
