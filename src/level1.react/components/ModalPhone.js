import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class ModalPhone extends Component {
  render() {
    const { onClickNext, step, ...props } = this.props;

    return (
      <Modal {...props}>
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
  }
}
