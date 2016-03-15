import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import reducer from '../reducers';
import ChainedModals from './ChainedModals';


const store = createStore(reducer);

const RoutedApp = () => (
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
