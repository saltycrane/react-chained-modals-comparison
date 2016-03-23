import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';


class ModalPhone extends Component {
  constructor(props) {
    super(props);
    const { formData: { phone } } = props;
    this.state = {
      phone: phone || ''
    };
  }

  render() {
    const { step, isRequesting, apiName, errorMsg, ...props } = this.props;
    const { phone } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRequesting &&
           <p><em>{`Making fake ajax request to ${apiName} api...`}</em></p>}
          <Input
            label="Enter your phone number"
            type="text"
            bsSize="large"
            {...(errorMsg ? {bsStyle: 'error'} : {})}
            help={errorMsg && <p><em>{errorMsg}</em></p>}
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

  _handleInputChange = () => {
    this.setState({phone: this._input.getValue()});
  };

  _handleClickNext = () => {
    const { storePhone } = this.props;
    const phone = this._input.getValue();
    storePhone(phone);
  };
}

export default ModalPhone;
