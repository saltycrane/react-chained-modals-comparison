import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';


export default class ModalPhone extends Component {
  constructor(props) {
    super(props);

    const { formData: { phone } } = props;
    this.state = {
      phone: phone || ''
    };
  }

  render() {
    const { step, requestStatus, errorMsg, ...props } = this.props;
    const { phone } = this.state;

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Step {step} - Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {requestStatus === 'REQUESTING' && <p><em>Making fake ajax request...</em></p>}
          {errorMsg && <p><em>{errorMsg}</em></p>}
          <Input
            label="Enter your phone number"
            type="text"
            bsSize="large"
            {...(requestStatus === 'FAILED' ? {bsStyle: 'error'} : {})}
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

  componentWillReceiveProps(nextProps) {
    const { requestStatus, gotoNext } = nextProps;

    if (requestStatus === 'SUCCEEDED') {
      gotoNext();
    }
  }

  _handleInputChange = () => {
    this.setState({
      phone: this._input.getValue()
    });
  };

  _handleClickNext = () => {
    const { storePhone } = this.props;
    const phone = this._input.getValue();

    storePhone(phone);
  };
}
