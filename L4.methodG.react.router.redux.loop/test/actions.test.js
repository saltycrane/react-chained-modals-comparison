import { expect } from 'chai';

import * as actions from '../src/actions';


describe('actions', () => {
  describe('routeChanged', () => {
    it('returns an action object', () => {
      const actual = actions.routeChanged('location object here');
      const expected = {
        type: actions.ROUTE_CHANGED,
        location: 'location object here'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('maybeGotoNext', () => {
    it('returns an action object', () => {
      const actual = actions.maybeGotoNext();
      const expected = {
        type: actions.MAYBE_GOTO_NEXT,
        skip: false
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('skipNext', () => {
    it('returns an action object', () => {
      const actual = actions.skipNext();
      const expected = {
        type: actions.MAYBE_GOTO_NEXT,
        skip: true
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('gotoNext', () => {
    it('returns an action object', () => {
      const actual = actions.gotoNext();
      const expected = {
        type: actions.GOTO_NEXT
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('gotoDone', () => {
    it('returns an action object', () => {
      const actual = actions.gotoDone();
      const expected = {
        type: actions.GOTO_DONE
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('callDoubleCheck', () => {
    it('returns an action object', () => {
      const actual = actions.callDoubleCheck();
      const expected = {
        type: actions.CALL_DOUBLE_CHECK_REQUESTED
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('callDoubleCheckFailed', () => {
    it('returns an action object', () => {
      const actual = actions.callDoubleCheckFailed('environmental factors');
      const expected = {
        type: actions.CALL_DOUBLE_CHECK_FAILED,
        errorMsg: 'environmental factors'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storeName', () => {
    it('returns an action object', () => {
      const actual = actions.storeName('Bonnie');
      const expected = {
        type: actions.STORE_NAME_REQUESTED,
        name: 'Bonnie'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storeNameSucceeded', () => {
    it('returns an action object', () => {
      const actual = actions.storeNameSucceeded('Bonnie');
      const expected = {
        type: actions.STORE_NAME_SUCCEEDED,
        name: 'Bonnie'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storeNameFailed', () => {
    it('returns an action object', () => {
      const actual = actions.storeNameFailed('overloaded');
      const expected = {
        type: actions.STORE_NAME_FAILED,
        errorMsg: 'overloaded'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhone', () => {
    it('returns an action object', () => {
      const actual = actions.storePhone('234')
      const expected = {
        type: actions.STORE_PHONE_REQUESTED,
        phone: '234'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhoneSucceeded', () => {
    it('returns an action object', () => {
      const actual = actions.storePhoneSucceeded('234')
      const expected = {
        type: actions.STORE_PHONE_SUCCEEDED,
        phone: '234'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhoneFailed', () => {
    it('returns an action object', () => {
      const actual = actions.storePhoneFailed('took too long');
      const expected = {
        type: actions.STORE_PHONE_FAILED,
        errorMsg: 'took too long'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('dummyAction', () => {
    it('returns an action object', () => {
      const actual = actions.dummyAction();
      const expected = {
        type: actions.DUMMY_ACTION
      };
      expect(actual).to.eql(expected);
    });
  });
});
