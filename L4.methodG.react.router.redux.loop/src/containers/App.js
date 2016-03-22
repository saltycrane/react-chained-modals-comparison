import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { install } from 'redux-loop';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import ModalDoubleCheck from '../components/ModalDoubleCheck';
import PageBehindModals from '../components/PageBehindModals';
import { routeChanged } from '../actions';
import reducer from '../reducers';
import ChainedModals from './ChainedModals';


const initialState = {
  modalList: [
    '/name',
    '/phone',
    '/check',
    '/done'
  ],
  currIndex: null,
  nextRoute: null,
  errorMsg: null,
  apiName: null,
  requestStatus: null,
  formData: {
    name: 'Backend',
    phone: null
  }
};

const store = createStore(reducer, initialState, install());

// Dispatch an action when the route changes.
// from https://github.com/reactjs/react-router-redux/issues/257
// TODO: where should this line go?
hashHistory.listen(location => store.dispatch(routeChanged(location)));

const RoutedApp = () => (
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

const App = ({ children }) => {
  return (
    <div>
      <PageBehindModals />
      {children}
    </div>
  );
}

export default RoutedApp;
