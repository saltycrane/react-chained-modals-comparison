import 'babel-polyfill';  // for async+await

import React, { Component } from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import ModalDoubleCheck from '../components/ModalDoubleCheck';
import PageBehindModals from '../components/PageBehindModals';
import { routeChanged } from '../actions';
import reducer from '../reducers';
import ChainedModals from './ChainedModals';


const store = createStore(reducer, applyMiddleware(thunk));

// Dispatch an action when the route changes.
// from https://github.com/reactjs/react-router-redux/issues/257
// TODO: where should this line go?
hashHistory.listen(location => store.dispatch(routeChanged(location)));

const RoutedApp = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" component={ChainedModals}>
            <Route path="/name" component={ModalName} />
            <Route path="/phone" component={ModalPhone} />
            <Route path="/check" component={ModalDoubleCheck} />
            <IndexRedirect to="/name" />
          </Route>
          <Route path="/done" />
        </Route>
      </Router>
    </Provider>
  );
};

const App = (props) => {
  const { children } = props;
  return (
    <div>
      <PageBehindModals />
      {children}
    </div>
  );
};

export default RoutedApp;
