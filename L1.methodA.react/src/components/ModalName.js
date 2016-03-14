import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const ModalName = (props) => {
  const { onClickNext, step, ...rest } = props;

  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Step {step} - Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter your name</p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={onClickNext}>Next</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalName;
