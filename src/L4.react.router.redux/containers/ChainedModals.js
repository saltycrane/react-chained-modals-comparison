import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import { storeName, storePhone } from '../actions';
import ModalBackdrop from '../components/ModalBackdrop';


class ChainedModals extends Component {
  render() {
    const { children, currIndex, ...props } = this.props;

    // Clone the child view element so we can pass props to it.
    // Taken from this react-router example:
    // https://github.com/reactjs/react-router/blob/v2.0.0/examples/passing-props-to-children/app.js
    const modalElement = children && React.cloneElement(children, {
      step: currIndex + 1,
      backdrop: false,
      show: true,
      gotoNext: this._gotoNext,
      onHide: this._handleModalHide,
      ...props
    });

    return (
      <div>
        <ModalBackdrop />
        {modalElement}
      </div>
    );
  }

  _gotoNext = () => {
    const { currIndex, modalList } = this.props;
    const nextIndex = currIndex + 1;
    const nextRoute = modalList[nextIndex];

    hashHistory.push(nextRoute);
  };

  _handleModalHide = () => {
    hashHistory.push('/done');
  };
}

export default connect(
  function mapStateToProps(state) {
    const { currIndex, modalList, formData } = state;
    return { currIndex, modalList, formData };
  },
  function mapDispatchToProps(dispatch) {
    return {
      storeName: (...args) => dispatch(storeName(...args)),
      storePhone: (...args) => dispatch(storePhone(...args))
    }
  }
)(ChainedModals);
