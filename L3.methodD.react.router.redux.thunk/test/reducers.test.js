import { expect } from 'chai';

import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_SUCCEEDED,
  STORE_NAME_FAILED,
  STORE_PHONE_REQUESTED,
  STORE_PHONE_SUCCEEDED,
  STORE_PHONE_FAILED
} from '../src/actions';
import reducer from '../src/reducers';


describe('reducers', () => {
  it('updates the current index on ROUTE_CHANGED', () => {
    const initial = {
      modalList: ['/name', '/phone', '/done'],
      currIndex: null,
      requestStatus: 'something that gets cleared',
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
      requestStatus: null,
      formData: null
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_NAME_REQUESTED', () => {
    const initial = {
      isRequesting: false,
      errorMsg: 'something that gets cleared',
      formData: null
    };
    const action = {
      type: STORE_NAME_REQUESTED
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: true,
      errorMsg: null,
      formData: null
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_NAME_SUCCEEDED', () => {
    const initial = {
      isRequesting: true,
      errorMsg: 'something to be cleared',
      formData: null
    };
    const action = {
      type: STORE_NAME_SUCCEEDED,
      name: 'Alex'
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: false,
      errorMsg: null,
      formData: {
        name: 'Alex'
      }
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_NAME_FAILED', () => {
    const initial = {
      isRequesting: true,
      errorMsg: null,
      formData: null
    };
    const action = {
      type: STORE_NAME_FAILED,
      errorMsg: 'it was their fault'
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: false,
      errorMsg: 'it was their fault',
      formData: null
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_PHONE_REQUESTED', () => {
    const initial = {
      isRequesting: false,
      errorMsg: 'something that gets cleared',
      formData: null
    };
    const action = {
      type: STORE_PHONE_REQUESTED
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: true,
      errorMsg: null,
      formData: null
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_PHONE_SUCCEEDED', () => {
    const initial = {
      isRequesting: true,
      errorMsg: 'something to be cleared',
      formData: null
    };
    const action = {
      type: STORE_PHONE_SUCCEEDED,
      phone: '234'
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: false,
      errorMsg: null,
      formData: {
        phone: '234'
      }
    };
    expect(actual).to.eql(expected);
  });

  it('should handle STORE_PHONE_FAILED', () => {
    const initial = {
      isRequesting: true,
      errorMsg: null,
      formData: null
    };
    const action = {
      type: STORE_PHONE_FAILED,
      errorMsg: 'it was their fault'
    };
    const actual = reducer(initial, action);
    const expected = {
      isRequesting: false,
      errorMsg: 'it was their fault',
      formData: null
    };
    expect(actual).to.eql(expected);
  });
});
