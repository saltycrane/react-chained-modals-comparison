import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

import { request } from '../request-simulator';


class ModalPhone extends Component {
  state = {
    isRequesting: false,
    hasError: false,
    errorMsg: null
  };

  render() {
    const { step, ...props } = this.props;
    const { isRequesting, hasError, errorMsg } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting && <p><em>Making fake ajax request...</em></p>}
          {errorMsg && <p><em>{errorMsg}</em></p>}
          <Input
            label="Enter your phone number"
            type="text"
            bsSize="large"
            {...(hasError ? {bsStyle: 'error'} : {})}
            ref={(c) => this._input = c}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this._handleClickNext}>Next</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  _handleClickNext = () => {
    const { gotoNext } = this.props;
    const phone = this._input.getValue();

    this.setState({isRequesting: true, errorMsg: null});

    request('/api/phone', phone)
      .then(() => {
        gotoNext();
      })
      .catch(() => {
        this.setState({
          isRequesting: false,
          hasError: true
        });
      });
  };
}

export default ModalPhone;
