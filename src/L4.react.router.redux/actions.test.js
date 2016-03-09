import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actions from './actions';


// TODO: figure out why adding this test makes all the other tests not run

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  describe('gotoDone', () => {
    it('does something', (done) => {
      const expectedActions = [
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(actions.gotoDone);
    });
  });
});
