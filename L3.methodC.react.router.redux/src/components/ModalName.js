import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

import { request } from '../request-simulator';


class ModalName extends Component {
  constructor(props) {
    super(props);
    const { formData: { name } } = props;
    this.state = {
      name: name || '',
      isRequesting: false,
      errorMsg: null
    };
  }

  render() {
    const { step, ...props } = this.props;
    const { name, isRequesting, errorMsg } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting && <p><em>Making fake ajax request...</em></p>}
          <Input
            label="Enter your name"
            type="text"
            bsSize="large"
            {...(errorMsg ? {bsStyle: 'error'} : {})}
            help={errorMsg && <em>{errorMsg}</em>}
            value={name}
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

  _handleInputChange = () => {
    this.setState({name: this._input.getValue()});
  };

  _handleClickNext = () => {
    const { storeName, gotoNext } = this.props;
    const name = this._input.getValue();

    this.setState({isRequesting: true, errorMsg: null});
    request('/api/name', name)
      .then(() => {
        storeName(name);
        gotoNext();
      })
      .catch((error) => {
        this.setState({isRequesting: false, errorMsg: error});
      });
  };
}

export default ModalName;
