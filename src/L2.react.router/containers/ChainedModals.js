import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ModalBackdrop from '../components/ModalBackdrop';


export default class ChainedModals extends Component {
  constructor(props) {
    super(props);

    this.modalList = props.modalList;

    this._handleClickNext = this._handleClickNext.bind(this);
    this._handleModalHide = this._handleModalHide.bind(this);
  }

  render() {
    const { children } = this.props;
    const { currIndex } = this.state;

    // Clone the child view element so we can pass props to it.
    // Taken from this react-router example:
    // https://github.com/reactjs/react-router/blob/v2.0.0/examples/passing-props-to-children/app.js
    const modalElement = children && React.cloneElement(children, {
      step: currIndex + 1,
      onClickNext: this._handleClickNext,
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

  _handleClickNext() {
    const { currIndex } = this.state;
    const nextIndex = currIndex + 1;
    const nextRoute = this.modalList[nextIndex];

    hashHistory.push(nextRoute);
    this.setState({currIndex: nextIndex});
  }

  _handleModalHide() {
    hashHistory.push('/done');
  }
}
