import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import ModalName from '../components/ModalName';
import ModalPhone from '../components/ModalPhone';
import PageBehindModals from '../components/PageBehindModals';
import ChainedModals from './ChainedModals';


const RoutedApp = () => (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={
        partial(ChainedModals, {
          modalList: ['/name', '/phone', '/done'],
          formData: {name: 'Backend'}
        })}>
        <Route path="/name" component={ModalName} />
        <Route path="/phone" component={ModalPhone} />
        <IndexRedirect to="/name" />
      </Route>
      <Route path="/done" />
    </Route>
  </Router>
);

const App = ({ children }) => {
  return (
    <div>
      <PageBehindModals />
      {children}
    </div>
  );
};

const partial = (Comp, props) => (fprops) => <Comp {...props} {...fprops} />;

export default RoutedApp;
