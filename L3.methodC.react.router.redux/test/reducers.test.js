import { expect } from 'chai';

import {
  ROUTE_CHANGED,
  STORE_NAME,
  STORE_PHONE
} from '../src/actions';
import reducer from '../src/reducers';


describe('reducers', () => {
  it('updates the current index on ROUTE_CHANGED', () => {
    const initial = {
      modalList: ['/name', '/phone', '/done'],
      currIndex: null,
      formData: null
    };
    const action = {
      type: ROUTE_CHANGED,
      location: {pathname: '/phone'}
    };
    const actual = reducer(initial, action);
    const expected = {
      modalList: ['/name', '/phone', '/done'],
      currIndex: 1,
      formData: null
    };
    expect(actual).to.eql(expected);
  });

  it('stores name on STORE_NAME', () => {
    const initial = {
      modalList: [],
      currIndex: null,
      formData: {
        name: null,
        phone: '234'
      }
    };
    const action = {
      type: STORE_NAME,
      name: 'Colin'
    };
    const actual = reducer(initial, action);
    const expected = {
      modalList: [],
      currIndex: null,
      formData: {
        name: 'Colin',
        phone: '234'
      }
    };
    expect(actual).to.eql(expected);
  });

  it('stores phone on STORE_PHONE', () => {
    const initial = {
      modalList: [],
      currIndex: null,
      formData: {
        name: 'Prefil',
        phone: null
      }
    };
    const action = {
      type: STORE_PHONE,
      phone: '234'
    };
    const actual = reducer(initial, action);
    const expected = {
      modalList: [],
      currIndex: null,
      formData: {
        name: 'Prefil',
        phone: '234'
      }
    };
    expect(actual).to.eql(expected);
  });
});
