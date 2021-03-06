import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';


export default class ModalName extends Component {
  constructor(props) {
    super(props);
    const { formData: { name } } = props;
    this.state = {
      name: name || ''
    };
  }

  render() {
    const { step, isRequesting, apiName, errorMsg, ...props } = this.props;
    const { name } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting &&
           <p><em>{`Making fake ajax request to ${apiName} api...`}</em></p>}
          <Input
            label="Enter your name"
            type="text"
            bsSize="large"
            {...(errorMsg ? {bsStyle: 'error'} : {})}
            help={errorMsg && <p><em>{errorMsg}</em></p>}
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
    storeName(name, gotoNext);
  };
}
