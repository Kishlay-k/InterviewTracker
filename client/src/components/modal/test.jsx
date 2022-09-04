import React from 'react';
import ModalWrapper from '../modal/modal';
import NewListItemForm from '../personalProblemSet/newListItemForm';
import Button from 'react-bootstrap/Button';

const Modal = ModalWrapper(NewListItemForm);

function Test() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
export default Test;





