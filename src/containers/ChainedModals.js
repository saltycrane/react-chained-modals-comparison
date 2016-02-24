import React, { Component } from 'react';

import ModalBackdrop from '../components/ModalBackdrop';


export default class ChainedModals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currIndex: 0,
      showModal: true
    };

    this.modalList = props.modalList;

    this._handleClickNext = this._handleClickNext.bind(this);
    this._handleModalHide = this._handleModalHide.bind(this);
  }

  render() {
    const { currIndex, showModal } = this.state;
    const ModalComponent = this.modalList[currIndex];

    return (
      <div>
        {showModal && <ModalBackdrop />}
        <ModalComponent
          step={currIndex + 1}
          onClickNext={this._handleClickNext}
          backdrop={false}
          show={showModal}
          onHide={this._handleModalHide}
        />
      </div>
    );
  }

  _handleClickNext() {
    const { currIndex } = this.state;

    if (currIndex < this.modalList.length - 1) {
      this.setState({currIndex: currIndex + 1});
    } else {
      this.setState({showModal: false});
    }
  }

  _handleModalHide() {
    this.setState({showModal: false});
  }
}
