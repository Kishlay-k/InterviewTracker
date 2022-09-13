import React,{useState} from 'react';
import {deleteListItem} from '../../api/index';
import {fetchUser} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import ModalWrapper from '../../components/modal/modal';
import ConfirmRemoveCompoment from './../confirmRemoveForm/confirmRemoveCompoment';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

function ListItem({el, sid, fetchUser}) {

    const [modalShow,setModalShow] = useState(false);

    const hideModal = ()=>{
        setModalShow(false);
    }

    const handleDeleteEle = async() => {
        console.log(sid, el._id);
        try {
            const data = {sid: sid};
            await deleteListItem(el._id, data);
            fetchUser();
            hideModal();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center pt-1 pb-1" style = {{cursor: 'pointer'}}>
                <a href = {el.link} target = "_blank" rel="noreferrer" style = {{textDecoration:'none'}}>{el.title}</a>
                <button type="button" className="close" aria-label="Close"><span aria-hidden="true" onClick={() => setModalShow(true)}>x</span></button>
                <Modal onHide={() => setModalShow(false)} show = {modalShow} handleDeleteEle = {handleDeleteEle} hideModal = {hideModal} />
            </li>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: ()=> dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(ListItem);