import React, { Component } from 'react';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import ChainedModals from './ChainedModals';


export default class App extends Component {
  render() {
    return (
      <div>
        <PageBehindModals />
        <ChainedModals modalList={[ModalName, ModalPhone]} />
      </div>
    );
  }
}
