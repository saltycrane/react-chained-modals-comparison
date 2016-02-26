import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import reducer from '../reducers';
import ChainedModals from './ChainedModals';


const store = createStore(reducer);

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
  <ChainedModals
    modalList={['/name', '/phone', '/done']}
    formData={{name: 'Backend'}}
    {...props} />);

export default class RoutedApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route component={App}>
            <Route path="/" component={ModalSequenceA}>
              <Route path="/name" component={ModalName} />
              <Route path="/phone" component={ModalPhone} />
            </Route>
            <Route path="/done" />
          </Route>
        </Router>
      </Provider>
    );
  }
}
