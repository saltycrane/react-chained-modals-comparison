import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class ModalName extends Component {
  render() {
    const { onClickNext, step, ...props } = this.props;

    return (
      <Modal {...props}>
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
  }
}
