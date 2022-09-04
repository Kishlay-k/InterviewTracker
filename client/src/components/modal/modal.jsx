import React from 'react';
import Modal from 'react-bootstrap/Modal'

const ModalWrapper = (WrapperComponent) => {
    const Wrapper = ({...props}) => {
        return (
        <Modal
            onHide = {props.onHide}
            show = {props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <WrapperComponent {...props}/>
        </Modal>
        );
    }

    return Wrapper;
};


export default ModalWrapper;