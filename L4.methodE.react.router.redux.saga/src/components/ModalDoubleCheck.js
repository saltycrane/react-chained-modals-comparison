import React from 'react';
import { hashHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap';


const ModalDoubleCheck = ({ step, errorMsg, ...rest }) => {
  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Step {step} - Double Check</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ERROR: { errorMsg }</p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={hashHistory.goBack}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDoubleCheck;
