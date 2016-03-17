import { expect } from 'chai';

import * as actions from '../src/actions';


describe('actions', () => {
  describe('storeName', () => {
    it('should return an action object', () => {
      const actual = actions.storeName('Milton');
      const expected = {
        type: actions.STORE_NAME_REQUESTED,
        name: 'Milton'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storeNameSucceeded', () => {
    it('should return an action object', () => {
      const actual = actions.storeNameSucceeded('Val');
      const expected = {
        type: actions.STORE_NAME_SUCCEEDED,
        name: 'Val'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storeNameFailed', () => {
    it('should return an action object', () => {
      const actual = actions.storeNameFailed('wrong name');
      const expected = {
        type: actions.STORE_NAME_FAILED,
        errorMsg: 'wrong name'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhone', () => {
    it('should return an action object', () => {
      const actual = actions.storePhone('234');
      const expected = {
        type: actions.STORE_PHONE_REQUESTED,
        phone: '234'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhoneSucceeded', () => {
    it('should return an action object', () => {
      const actual = actions.storePhoneSucceeded('234');
      const expected = {
        type: actions.STORE_PHONE_SUCCEEDED,
        phone: '234'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhoneFailed', () => {
    it('should return an action object', () => {
      const actual = actions.storePhoneFailed('wrong phone');
      const expected = {
        type: actions.STORE_PHONE_FAILED,
        errorMsg: 'wrong phone'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('callDoubleCheck', () => {
    it('should return an action object', () => {
      const actual = actions.callDoubleCheck();
      const expected = {
        type: actions.CALL_DOUBLE_CHECK_REQUESTED
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('callDoubleCheckSucceeded', () => {
    it('should return an action object', () => {
      const actual = actions.callDoubleCheckSucceeded();
      const expected = {
        type: actions.CALL_DOUBLE_CHECK_SUCCEEDED
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('callDoubleCheckFailed', () => {
    it('should return an action object', () => {
      const actual = actions.callDoubleCheckFailed('something failed');
      const expected = {
        type: actions.CALL_DOUBLE_CHECK_FAILED,
        errorMsg: 'something failed'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('routeChanged', () => {
    it('should return an action object', () => {
      const actual = actions.routeChanged('location object here');
      const expected = {
        type: actions.ROUTE_CHANGED,
        location: 'location object here'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('gotoNext', () => {
    it('should return an action object', () => {
      const actual = actions.gotoNext();
      const expected = {
        type: actions.GOTO_NEXT
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('gotoDone', () => {
    it('should return an action object', () => {
      const actual = actions.gotoDone();
      const expected = {
        type: actions.GOTO_DONE
      };
      expect(actual).to.eql(expected);
    });
  });

});
