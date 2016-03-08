import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ModalBackdrop from '../components/ModalBackdrop';


class ChainedModals extends Component {
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
    const { modalList, location: { pathname } } = props;
    const index = modalList.findIndex(path => path === pathname);
    this.setState({currIndex: index});
  }

  _handleClickNext = () => {
    const { modalList } = this.props;
    const { currIndex } = this.state;
    const nextIndex = currIndex + 1;
    const nextRoute = modalList[nextIndex];

    hashHistory.push(nextRoute);
  };

  _handleModalHide = () => {
    hashHistory.push('/done');
  };
}

export default ChainedModals;
