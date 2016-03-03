import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class ModalDoubleCheck extends Component {
  render() {
    const { step, ...props } = this.props;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Double Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this._handleClickNext}>Next</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  _handleInputChange = () => {
    this.setState({
      name: this._input.getValue()
    });
  };

  _handleClickNext = () => {
    const { gotoNext } = this.props;

    gotoNext();
  }
}
