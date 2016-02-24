import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';

import DevTools from './containers/DevTools';
import rootReducer from './reducers';


const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}
