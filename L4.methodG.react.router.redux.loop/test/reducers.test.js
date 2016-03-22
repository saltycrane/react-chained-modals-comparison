import { Effects, loop } from 'redux-loop';
import { expect } from 'chai';

import * as actions from '../src/actions';
import reducer, * as reducers from '../src/reducers';


describe('reducers', () => {
  it('updates the current index on ROUTE_CHANGED', () => {
    const initial = {
      modalList: ['/name', '/phone', '/done'],
      currIndex: null,
      requestStatus: 'something that gets cleared',
      formData: null
    };
    const action = {
      type: actions.ROUTE_CHANGED,
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

  it('handles MAYBE_GOTO_NEXT', () => {
    const initial = {
      modalList: ['/name', '/phone', '/check', '/done'],
      currIndex: 0,
      nextRoute: null
    };
    const action = {
      type: actions.MAYBE_GOTO_NEXT,
      skip: false
    };
    const actual = reducer(initial, action);
    const expected = loop(
      {
        modalList: ['/name', '/phone', '/check', '/done'],
        currIndex: 0,
        nextRoute: '/phone'
      },
      Effects.promise(reducers.alwaysShow)
    );
    expect(actual).to.eql(expected);
  });

  it('handles MAYBE_GOTO_NEXT with skip=true', () => {
    const initial = {
      modalList: ['/name', '/phone', '/check', '/done'],
      currIndex: 1,
      nextRoute: null
    };
    const action = {
      type: actions.MAYBE_GOTO_NEXT,
      skip: true
    };
    const actual = reducer(initial, action);
    const expected = loop(
      {
        modalList: ['/name', '/phone', '/check', '/done'],
        currIndex: 1,
        nextRoute: '/done'
      },
      Effects.promise(reducers.alwaysShow)
    );
    expect(actual).to.eql(expected);
  });

  it('handles GOTO_NEXT', () => {
    const initial = {
      nextRoute: '/phone'
    };
    const action = {
      type: actions.GOTO_NEXT
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        nextRoute: '/phone'
      },
      Effects.promise(reducers._gotoRoute, '/phone')
    ];
    expect(actual).to.eql(expected);
  });

  it('handles CALL_DOUBLE_CHECK_REQUESTED', () => {
    const initial = {
      formData: 'form data object here'
    };
    const action = {
      type: actions.CALL_DOUBLE_CHECK_REQUESTED
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        formData: 'form data object here',
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'check'
      },
      Effects.promise(reducers._callDoubleCheck, 'form data object here')
    ];
    expect(actual).to.eql(expected);
  });

  it('handles GOTO_DONE', () => {
    const initial = {};
    const action = {
      type: actions.GOTO_DONE
    };
    const actual = reducer(initial, action);
    const expected = [
      {},
      Effects.promise(reducers._gotoDone)
    ];
    expect(actual).to.eql(expected);
  });

  it('handles STORE_NAME_REQUESTED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_NAME_REQUESTED,
      name: 'Hayden'
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'name'
      },
      Effects.promise(reducers._storeName, 'Hayden')
    ];
    expect(actual).to.eql(expected);
  });

  it('handles STORE_PHONE_REQUESTED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_PHONE_REQUESTED,
      phone: '234'
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'phone'
      },
      Effects.promise(reducers._storePhone, '234')
    ];
    expect(actual).to.eql(expected);
  });

  it('handles STORE_NAME_SUCCEEDED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_NAME_SUCCEEDED,
      name: 'Hal'
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        formData: {
          name: 'Hal'
        }
      },
      Effects.constant(actions.maybeGotoNext())
    ];
    expect(actual).to.eql(expected);
  });

  it('handles STORE_PHONE_SUCCEEDED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_PHONE_SUCCEEDED,
      phone: '234'
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        formData: {
          phone: '234'
        }
      },
      Effects.constant(actions.maybeGotoNext())
    ];
    expect(actual).to.eql(expected);
  });

  it('handles CALL_DOUBLE_CHECK_SUCCEEDED', () => {
    const initial = {};
    const action = {
      type: actions.CALL_DOUBLE_CHECK_SUCCEEDED
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        requestStatus: 'SUCCEEDED',
        errorMsg: null
      },
      Effects.constant(actions.skipNext())
    ];
    expect(actual).to.eql(expected);
  });

  it('handles CALL_DOUBLE_CHECK_FAILED', () => {
    const initial = {};
    const action = {
      type: actions.CALL_DOUBLE_CHECK_FAILED,
      errorMsg: 'computer is too hot'
    };
    const actual = reducer(initial, action);
    const expected = [
      {
        requestStatus: 'FAILED',
        errorMsg: 'computer is too hot'
      },
      Effects.constant(actions.gotoNext())
    ];
    expect(actual).to.eql(expected);
  });

  it('handles STORE_NAME_FAILED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_NAME_FAILED,
      errorMsg: 'the box was too heavy'
    };
    const actual = reducer(initial, action);
    const expected = {
      requestStatus: 'FAILED',
      errorMsg: 'the box was too heavy'
    };
    expect(actual).to.eql(expected);
  });

  it('handles STORE_PHONE_FAILED', () => {
    const initial = {};
    const action = {
      type: actions.STORE_PHONE_FAILED,
      errorMsg: 'the box was too light'
    };
    const actual = reducer(initial, action);
    const expected = {
      requestStatus: 'FAILED',
      errorMsg: 'the box was too light'
    };
    expect(actual).to.eql(expected);
  });
});
