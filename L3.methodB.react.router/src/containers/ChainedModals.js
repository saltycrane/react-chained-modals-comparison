import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ModalBackdrop from '../components/ModalBackdrop';


class ChainedModals extends Component {
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
  }

  render() {
    const { children } = this.props;
    const { currIndex, formData } = this.state;

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
    const { modalList, location: { pathname } } = props;
    const index = modalList.findIndex(path => path === pathname);
    this.setState({currIndex: index});
  }

  _gotoNext = () => {
    const { modalList } = this.props;
    const { currIndex } = this.state;
    const nextIndex = currIndex + 1;
    const nextRoute = modalList[nextIndex];
    this.setState({currIndex: nextIndex});
    hashHistory.push(nextRoute);
  };

  _handleModalHide = () => {
    hashHistory.push('/done');
  };

  _storeName = (name) => {
    this.setState({
      formData: {
        ...this.state.formData,
        name: name
      }
    });
  };

  _storePhone = (phone) => {
    this.setState({
      formData: {
        ...this.state.formData,
        phone: phone
      }
    });
  };
}

export default ChainedModals;
