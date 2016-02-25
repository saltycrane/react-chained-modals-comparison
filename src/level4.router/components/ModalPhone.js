import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

import { request } from '../../request-simulator';


export default class ModalPhone extends Component {
  constructor(props) {
    super(props);

    const { formData: { phone } } = props;
    this.state = {
      phone: phone || '',
      isRequesting: false,
      hasError: false,
      errorMsg: null
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleClickNext = this._handleClickNext.bind(this);
  }

  render() {
    const { step, storePhone, ...props } = this.props;
    const { phone, isRequesting, hasError, errorMsg } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting && <p><em>Making fake ajax request...</em></p>}
          {errorMsg && <p><em>{errorMsg}</em></p>}
          <Input
            label="Enter your phone number"
            type="text"
            bsSize="large"
            {...(hasError ? {bsStyle: 'error'} : {})}
            value={phone}
            onChange={this._handleInputChange}
            ref={(c) => this._input = c}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this._handleClickNext}>Next</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  _handleInputChange() {
    this.setState({
      phone: this._input.getValue()
    });
  }

  _handleClickNext() {
    const { storePhone, gotoNext } = this.props;
    const phone = this._input.getValue();

    this.setState({isRequesting: true, errorMsg: null});

    request('/api/phone', phone)
      .then(() => {
        storePhone(phone);
        gotoNext();
      })
      .catch((error) => {
        this.setState({
          isRequesting: false,
          hasError: true,
          errorMsg: error
        });
      });
  }
}
