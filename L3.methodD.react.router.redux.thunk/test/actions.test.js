import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_SUCCEEDED,
  STORE_NAME_FAILED,
  STORE_PHONE_REQUESTED,
  STORE_PHONE_SUCCEEDED,
  routeChanged,
  gotoNext,
  gotoDone,
  storeName,
  storePhone
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

  // // TODO: need to mock history somehow
  // describe('gotoNext', () => {
  //   it('navigates to the next route', (done) => {
  //     const initialState = {
  //       modalList: ['/name', '/phone', '/done'],
  //       currIndex: 0
  //     };
  //     const store = mockStore(initialState);
  //     const expectedActions = [];
  //     store.dispatch(gotoNext())
  //       .then(() => {
  //         const actualActions = store.getActions();
  //         expect(actualActions).to.eql(expectedActions);
  //         done();
  //       });
  //   });
  // });

  // describe('gotoDone', () => {
  //   it('runs without error', (done) => {
  //     const store = mockStore({});
  //     store.dispatch(gotoDone())
  //       .then(() => {
  //         done();
  //       });
  //   });
  // });

  // normally the request would be mocked with a library such as nock
  // but I am just simulating the request
  describe('storeName', () => {
    it('dispatches actions on success', (done) => {
      const store = mockStore({});
      store.dispatch(storeName('Winter McGee'))
        .then(() => {
          const actualActions = store.getActions();
          const expectedActions = [
            {type: STORE_NAME_REQUESTED},
            {type: STORE_NAME_SUCCEEDED, name: 'Winter McGee'}
          ];
          expect(actualActions).to.eql(expectedActions);
          done();
        })
        .catch((e) => {
          console.error(e.stack);
        });
    });

    it('dispatches actions on failure', (done) => {
      const store = mockStore({});
      store.dispatch(storeName('Winter'))
        .then(() => {
          const actualActions = store.getActions();
          const expectedActions = [
            {type: STORE_NAME_REQUESTED},
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

  describe('storePhone', () => {
    it('dispatches actions on success', (done) => {
      const store = mockStore({});
      store.dispatch(storePhone('234'))
        .then(() => {
          const actualActions = store.getActions();
          const expectedActions = [
            {type: STORE_PHONE_REQUESTED},
            {type: STORE_PHONE_SUCCEEDED, phone: '234'}
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
