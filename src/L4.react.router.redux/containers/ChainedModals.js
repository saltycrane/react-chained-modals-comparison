import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  setCurrentIndex,
  storeName,
  storePhone
} from '../actions';
import ModalBackdrop from '../components/ModalBackdrop';


class ChainedModals extends Component {
  constructor(props) {
    super(props);

    this.modalList = props.modalList;

    this._gotoNext = this._gotoNext.bind(this);
    this._handleModalHide = this._handleModalHide.bind(this);
  }

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

  componentWillMount() {
    this._setIndexFromRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setIndexFromRoute(nextProps);
  }

  _setIndexFromRoute(props) {
    const { setCurrentIndex, location: { pathname } } = props;
    // TODO: move modalList to Redux
    const index = this.modalList.findIndex(path => path === pathname);
    setCurrentIndex(index);
  }

  _gotoNext() {
    const { currIndex, setCurrentIndex } = this.props;
    const nextIndex = currIndex + 1;
    const nextRoute = this.modalList[nextIndex];

    setCurrentIndex(nextIndex);
    hashHistory.push(nextRoute);
  }

  _handleModalHide() {
    hashHistory.push('/done');
  }
}

export default connect(
  function mapStateToProps(state) {
    const { currIndex, formData } = state;
    return { currIndex, formData };
  },
  function mapDispatchToProps(dispatch) {
    return {
      // gotoNext: (...args) => dispatch(gotoNext(...args)),
      setCurrentIndex: (...args) => dispatch(setCurrentIndex(...args)),
      storeName: (...args) => dispatch(storeName(...args)),
      storePhone: (...args) => dispatch(storePhone(...args))
    }
  }
)(ChainedModals);
