import React, {useState,useEffect} from 'react';
import ListItem from './listItem';
import {addProblems} from '../../api/index';
import {addProblem} from '../../redux/user/userActions.js';
import {connect} from 'react-redux';
import NewListItemForm from './newListItemForm';
import ModalWrapper from '../../components/modal/modal';

const Modal = ModalWrapper(NewListItemForm);


function ProblemSetListComponent({playlist, addProblem}) {

    const [modalShow, setModalShow] = useState(false);

    const [formdata, setformdata] = useState({
        title: '',
        topic: '',
        link: ''
    });


    useEffect(() => {
        setModalShow(false);
    },[playlist]);

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setModalShow(false);
            console.log(playlist._id);
            await addProblems(playlist._id, formdata);
            addProblem(formdata, playlist._id);
            setformdata({
                title: '',
                topic: '',
                link: ''
            });
           
        } catch(err) {
            alert(err.response?.data?.message);
        }
    }


    return (
        <div>
            <h5>{playlist.name}</h5>
            <ol className="list-group">
            {
                playlist?.list?.map((el, i) =>(
                    <ListItem key = {i} el = {el} sid = {playlist._id} />
                ))
            }
            </ol>

            <div>
                {
                    modalShow ? null
                    :
                    <button className="btn btn-primary mt-3" onClick = {() => setModalShow(true)}>Add Problem</button>
                }
                <Modal onHide={() => setModalShow(false)} show = {modalShow} handleSubmit = {handleSubmit} handleChange = {handleChange} {...formdata}/>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) =>({
    addProblem: (data, id) => dispatch(addProblem(data,id)),
});


export  default connect(null, mapDispatchToProps)(ProblemSetListComponent);