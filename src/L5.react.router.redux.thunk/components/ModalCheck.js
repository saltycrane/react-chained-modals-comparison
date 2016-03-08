import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const ModalDoubleCheck = (props) => {
  const { step, gotoNext, ...rest } = props;

  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Step {step} - Double Check</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={gotoNext}>Next</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDoubleCheck;
