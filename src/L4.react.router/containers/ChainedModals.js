import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ModalBackdrop from '../components/ModalBackdrop';


export default class ChainedModals extends Component {
  constructor(props) {
    super(props);

    const { formData } = props;
    this.state = {
      currIndex: null,
      formData: {
        name: null,
        phone: null,
        ...formData
      }
    };

    this.modalList = props.modalList;

    this._gotoNext = this._gotoNext.bind(this);
    this._handleModalHide = this._handleModalHide.bind(this);
    this._storeName = this._storeName.bind(this);
    this._storePhone = this._storePhone.bind(this);
  }

  render() {
    const { children } = this.props;
    const { currIndex, formData } = this.state;

    // Clone the child view element so we can pass props to it.
    // Taken from this react-router example:
    // https://github.com/reactjs/react-router/blob/v2.0.0/examples/passing-props-to-children/app.js
    const modalElement = children && React.cloneElement(children, {
      step: currIndex + 1,
      formData: formData,
      storeName: this._storeName,
      storePhone: this._storePhone,
      gotoNext: this._gotoNext,
      backdrop: false,
      show: true,
      onHide: this._handleModalHide
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
    const { location: { pathname } } = props;
    const index = this.modalList.findIndex(path => path === pathname);
    this.setState({currIndex: index});
  }

  _gotoNext() {
    const { currIndex } = this.state;
    const nextIndex = currIndex + 1;
    const nextRoute = this.modalList[nextIndex];

    this.setState({currIndex: nextIndex});
    hashHistory.push(nextRoute);
  }

  _handleModalHide() {
    hashHistory.push('/done');
  }

  _storeName(name) {
    this.setState({
      formData: {
        ...this.state.formData,
        name: name
      }
    });
  }

  _storePhone(phone) {
    this.setState({
      formData: {
        ...this.state.formData,
        phone: phone
      }
    });
  }
}
