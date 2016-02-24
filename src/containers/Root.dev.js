import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import DevTools from './DevTools';
import configureStore from '../configureStore';


const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
