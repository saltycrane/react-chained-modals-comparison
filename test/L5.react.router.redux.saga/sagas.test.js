import 'babel-polyfill';  // for generators used with redux-saga
import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { request } from '../../src/request-simulator';
import * as actions from '../../src/L5.react.router.redux.saga/actions';
import * as sagas from '../../src/L5.react.router.redux.saga/sagas';


describe('sagas', () => {
  describe('storeName', () => {
    it('dispatches gotoNext() on success', () => {
      const action = {name: 'Phil'};
      const iter = sagas.storeName(action);

      const actual1 = iter.next().value;
      const expected1 = call(request, '/api/name', 'Phil');
      expect(actual1).to.eql(expected1);

      const actual2 = iter.next().value;
      const expected2 = put(actions.storeNameSucceeded('Phil'));
      expect(actual2).to.eql(expected2);

      const actual3 = iter.next().value;
      const expected3 = put(actions.gotoNext());
      expect(actual3).to.eql(expected3);
    });
  });
});
