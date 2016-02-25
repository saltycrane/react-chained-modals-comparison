import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

import { request } from '../../request-simulator';


export default class ModalPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRequesting: false,
      hasError: false
    };

    this._handleClickNext = this._handleClickNext.bind(this);
  }

  render() {
    const { step, ...props } = this.props;
    const { isRequesting, hasError } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting && <p><em>Making fake ajax request...</em></p>}
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

  _handleClickNext() {
    const { gotoNext } = this.props;
    const phone = this._input.getValue();

    this.setState({isRequesting: true});

    request('/my/api/url', phone)
      .then(() => {
        gotoNext();
      })
      .catch(() => {
        this.setState({
          isRequesting: false,
          hasError: true
        });
      });
  }
}
