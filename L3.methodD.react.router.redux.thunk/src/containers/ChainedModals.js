import React from 'react';
import { connect } from 'react-redux';

import {
  gotoNext,
  gotoDone,
  storeName,
  storePhone
} from '../actions';
import ModalBackdrop from '../components/ModalBackdrop';


const ChainedModals = (props) => {
  const { children, currIndex, gotoDone, ...rest } = props;

  // Clone the child view element so we can pass props to it.
  // Taken from this react-router example:
  // https://github.com/reactjs/react-router/blob/v2.0.0/examples/passing-props-to-children/app.js
  const modalElement = children && React.cloneElement(children, {
    step: currIndex + 1,
    backdrop: false,
    show: true,
    onHide: gotoDone,
    ...rest
  });

  return (
    <div>
      <ModalBackdrop />
      {modalElement}
    </div>
  );
};

export default connect(
  function mapStateToProps(state) {
    const { currIndex, modalList, requestStatus, errorMsg, formData } = state;
    return { currIndex, modalList, requestStatus, errorMsg, formData };
  },
  function mapDispatchToProps(dispatch) {
    return {
      gotoNext: (...args) => dispatch(gotoNext(...args)),
      gotoDone: (...args) => dispatch(gotoDone(...args)),
      storeName: (...args) => dispatch(storeName(...args)),
      storePhone: (...args) => dispatch(storePhone(...args))
    }
  }
)(ChainedModals);
