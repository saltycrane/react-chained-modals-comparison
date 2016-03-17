import 'babel-polyfill';  // for generators used with redux-saga
import { expect } from 'chai';
import { call, put, select } from 'redux-saga/effects';

import { request } from '../src/request-simulator';
import * as actions from '../src/actions';
import * as sagas from '../src/sagas';


describe('sagas', () => {
  // // TODO: history needs to be mocked
  // describe('gotoNext', () => {
  //   it('', () => {
  //   });
  // });

  describe('shouldShowDoubleCheck', () => {
    it('returns false on success', () => {
      const iter = sagas.shouldShowDoubleCheck();

      const actual1 = iter.next().value;
      const expected1 = select();
      expect(actual1).to.eql(expected1);

      const state = {formData: 'form data here'};
      const actual2 = iter.next(state).value;
      const expected2 = put(actions.callDoubleCheck());
      expect(actual2).to.eql(expected2);

      const actual3 = iter.next().value;
      const expected3 = call(request, '/api/check', 'form data here');
      expect(actual3).to.eql(expected3);

      const actual4 = iter.next().value;
      const expected4 = put(actions.callDoubleCheckSucceeded());
      expect(actual4).to.eql(expected4);

      const actual5 = iter.next().value;
      const expected5 = false;
      expect(actual5).to.eql(expected5);
    });

    it('it returns true on failure', () => {
      const iter = sagas.shouldShowDoubleCheck();

      const actual1 = iter.next().value;
      const expected1 = select();
      expect(actual1).to.eql(expected1);

      const state = {formData: 'form data here'};
      const actual2 = iter.next(state).value;
      const expected2 = put(actions.callDoubleCheck());
      expect(actual2).to.eql(expected2);

      const actual3 = iter.next().value;
      const expected3 = call(request, '/api/check', 'form data here');
      expect(actual3).to.eql(expected3);

      const actual4 = iter.throw('your name is too unique').value;
      const expected4 = put(actions.callDoubleCheckFailed('your name is too unique'));
      expect(actual4).to.eql(expected4);

      const actual5 = iter.next().value;
      const expected5 = true;
      expect(actual5).to.eql(expected5);
    });
  });

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

    it('dispatches storeNameFailed() on failure', () => {
      const action = {name: 'Hill'};
      const iter = sagas.storeName(action);

      const actual1 = iter.next().value;
      const expected1 = call(request, '/api/name', 'Hill');
      expect(actual1).to.eql(expected1);

      const actual2 = iter.throw('your name is misspelled').value;
      const expected2 = put(actions.storeNameFailed('your name is misspelled'));
      expect(actual2).to.eql(expected2);
    })
  });

  describe('storePhone', () => {
    it('dispatches gotoNext() on success', () => {
      const action = {phone: '234'};
      const iter = sagas.storePhone(action);

      const actual1 = iter.next().value;
      const expected1 = call(request, '/api/phone', '234');
      expect(actual1).to.eql(expected1);

      const actual2 = iter.next().value;
      const expected2 = put(actions.storePhoneSucceeded('234'));
      expect(actual2).to.eql(expected2);

      const actual3 = iter.next().value;
      const expected3 = put(actions.gotoNext());
      expect(actual3).to.eql(expected3);
    });

    it('dispatches storePhoneFailed() on failure', () => {
      const action = {phone: '234'};
      const iter = sagas.storePhone(action);

      const actual1 = iter.next().value;
      const expected1 = call(request, '/api/phone', '234');
      expect(actual1).to.eql(expected1);

      const actual2 = iter.throw("that is your dentist's phone number").value;
      const expected2 = put(actions.storePhoneFailed("that is your dentist's phone number"));
      expect(actual2).to.eql(expected2);
    })
  });
});
