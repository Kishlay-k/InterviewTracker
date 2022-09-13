/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {deleteList} from '../../api/index';
import {fetchUser} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import ModalWrapper from '../../components/modal/modal';
import ConfirmRemoveCompoment from './../confirmRemoveForm/confirmRemoveCompoment';

import './list.scss';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

function ProblemSetItem({el, func, fetchUser}) {

    const loc  = useLocation();
    let val = queryString.parse(loc.search);

    const [deletelist, setdeletelist] = useState(false);
    const history = useHistory();
    
    const [modalShow,setModalShow] = useState(false);
    const hideModal = ()=>{
        setModalShow(false);
    }

    const handleDeleteEle = async () => {
        try {
            const res = await deleteList(el._id);
            setdeletelist(e => !e);
            fetchUser();
            hideModal();
            history.push('/list?name=Favorite');
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <div className="problemset-item" style = {{cursor: 'pointer'}} onClick={(f) => func(el.name)}>
            <div className={`problemset-name ${el.name === val.name ? 'active' : ''}`}><span className={`arrow ${el.name === val.name ? 'active' : ''}`}>{'->'}</span>{el.name}</div>
            {
                el.name === 'Favorite' ? 
                    null
                :
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={e => setModalShow(true)}>x</span>
                    </button>
            }
            <Modal onHide={() => setModalShow(false)} show = {modalShow} handleDeleteEle = {handleDeleteEle} hideModal = {hideModal} />
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser : () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(ProblemSetItem);