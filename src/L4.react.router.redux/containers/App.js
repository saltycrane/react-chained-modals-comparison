import React, { Component } from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import { routeChanged } from '../actions';
import reducer from '../reducers';
import ChainedModals from './ChainedModals';


const store = createStore(reducer);

// Dispatch an action when the route changes.
// from https://github.com/reactjs/react-router-redux/issues/257
// TODO: where should this line go?
hashHistory.listen(location => store.dispatch(routeChanged(location)));

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

export default class RoutedApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route component={App}>
            <Route path="/" component={ChainedModals}>
              <Route path="/name" component={ModalName} />
              <Route path="/phone" component={ModalPhone} />
              <IndexRedirect to="/name" />
            </Route>
            <Route path="/done" />
          </Route>
        </Router>
      </Provider>
    );
  }
}
