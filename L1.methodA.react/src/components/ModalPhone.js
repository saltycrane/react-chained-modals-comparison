import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const ModalPhone = ({ onClickNext, step, ...rest }) => {
  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Step {step} - Phone</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter your phone number</p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={onClickNext}>Next</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPhone;
