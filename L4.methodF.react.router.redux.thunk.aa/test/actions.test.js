import 'babel-polyfill';  // for async+await

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import sinon from 'sinon';

import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_FAILED,
  routeChanged,
  storeName
} from '../src/actions';


const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  describe('routeChanged', () => {
    it('returns an action object', () => {
      const actual = routeChanged('location object here');
      const expected = {
        type: ROUTE_CHANGED,
        location: 'location object here'
      };
      expect(actual).to.eql(expected);
    });
  });

  // normally the request would be mocked with a library such as nock
  // but I am just simulating the request
  describe('storeName', () => {
    it('dispatches actions on failure', (done) => {
      const store = mockStore({});
      const spy = sinon.spy();
      store.dispatch(storeName('Winter', spy))
        .then(() => {
          const actualActions = store.getActions();
          const expectedActions = [
            {type: STORE_NAME_REQUESTED, apiName: 'name'},
            {type: STORE_NAME_FAILED, errorMsg: 'Specify first and last name.'}
          ];
          expect(actualActions).to.eql(expectedActions);
          done();
        })
        .catch((e) => {
          console.error(e.stack);
        });
    });
  });
});
