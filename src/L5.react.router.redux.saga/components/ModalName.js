import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';


export default class ModalName extends Component {
  constructor(props) {
    super(props);

    const { formData: { name } } = props;
    this.state = {
      name: name || ''
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleClickNext = this._handleClickNext.bind(this);
  }

  render() {
    const { step, requestStatus, errorMsg, ...props } = this.props;
    const { name } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {requestStatus === 'REQUESTING' && <p><em>Making fake ajax request...</em></p>}
          {errorMsg && <p><em>{errorMsg}</em></p>}
          <Input
            label="Enter your name"
            type="text"
            bsSize="large"
            {...(requestStatus === 'FAILED' ? {bsStyle: 'error'} : {})}
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

  _handleInputChange() {
    this.setState({
      name: this._input.getValue()
    });
  }

  _handleClickNext() {
    const { storeName } = this.props;
    const name = this._input.getValue();

    storeName(name);
  }
}
