import React from 'react';
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
// see also https://github.com/reactjs/redux/pull/1414
// Where to put this? Decided to put it here instead of in the ChainedModals component.
// react-router-redux's syncHistoryWithStore adds a history listener and
// it is in the index.js file in the real world example in Redux:
// https://github.com/reactjs/redux/blob/175f32a99368980e24a4277ad9a3b2a4d012331f/examples/real-world/index.js#L10
hashHistory.listen(location => store.dispatch(routeChanged(location)));

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

const App = ({ children }) => (
  <div>
    <PageBehindModals />
    {children}
  </div>
);

export default RoutedApp;
