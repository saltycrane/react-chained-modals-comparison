import { expect } from 'chai';

import {
  ROUTE_CHANGED,
  STORE_NAME,
  STORE_PHONE,
  routeChanged,
  storeName,
  storePhone
} from '../src/actions';


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

  describe('storeName', () => {
    it('returns an action object', () => {
      const actual = storeName('Barry');
      const expected = {
        type: STORE_NAME,
        name: 'Barry'
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('storePhone', () => {
    it('returns an action object', () => {
      const actual = storePhone('234');
      const expected = {
        type: STORE_PHONE,
        phone: '234'
      };
      expect(actual).to.eql(expected);
    });
  });
});
