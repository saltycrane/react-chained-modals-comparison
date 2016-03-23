import React from 'react';
import { connect } from 'react-redux';

import {
  maybeGotoNext,
  gotoDone,
  storeName,
  storePhone
} from '../actions';
import ModalBackdrop from '../components/ModalBackdrop';


const ChainedModals = ({ children, ...rest }) => {
  const modalElement = children && React.cloneElement(children, rest);
  return (
    <div>
      <ModalBackdrop />
      {modalElement}
    </div>
  );
};

export default connect(
  function mapStateToProps(state) {
    const { currIndex, isRequesting, apiName, errorMsg, formData } = state;
    return {
      backdrop: false,
      show: true,
      step: currIndex + 1,
      isRequesting,
      apiName,
      errorMsg,
      formData
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      gotoNext: (...args) => dispatch(maybeGotoNext(...args)),
      onHide: (...args) => dispatch(gotoDone(...args)),
      storeName: (...args) => dispatch(storeName(...args)),
      storePhone: (...args) => dispatch(storePhone(...args))
    }
  }
)(ChainedModals);
