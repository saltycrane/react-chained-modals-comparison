import React, { Component } from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import ChainedModals from './ChainedModals';


class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <PageBehindModals />
        {children}
      </div>
    );
  }
}

const ModalSequenceA = (props) => (
  <ChainedModals modalList={['/name', '/phone', '/done']} {...props} />);

export default class RoutedApp extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" component={ModalSequenceA}>
            <Route path="/name" component={ModalName} />
            <Route path="/phone" component={ModalPhone} />
            <IndexRedirect to="/name" />
          </Route>
          <Route path="/done" />
        </Route>
      </Router>
    );
  }
}
