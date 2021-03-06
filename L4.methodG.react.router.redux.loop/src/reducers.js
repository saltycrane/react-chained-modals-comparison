import { hashHistory } from 'react-router';
import { Effects, loop } from 'redux-loop';

import { request } from './request-simulator';
import * as actions from './actions';


const SHOULD_SHOW_MAP = {
  '/name': alwaysShow,
  '/phone': alwaysShow,
  '/check': shouldShowDoubleCheck,
  '/done': alwaysShow
};

function modalsReducer(state, action) {
  switch (action.type) {
    case actions.ROUTE_CHANGED: {
      const { location: { pathname } } = action;
      const index = state.modalList.findIndex(path => path === pathname);
      return {
        ...state,
        isRequesting: false,
        currIndex: index
      };
    }
    case actions.MAYBE_GOTO_NEXT: {
      const { modalList, currIndex } = state;
      const { skip } = action;
      const incr = skip ? 2 : 1;
      const nextRoute = modalList[currIndex + incr];
      const shouldShowFn = SHOULD_SHOW_MAP[nextRoute];
      return loop(
        {
          ...state,
          nextRoute
        },
        Effects.promise(shouldShowFn)
      );
    }
    case actions.GOTO_NEXT: {
      const { nextRoute } = state;
      return loop(
        state,
        Effects.promise(_gotoRoute, nextRoute)
      );
    }
    case actions.CALL_DOUBLE_CHECK_REQUESTED: {
      const { formData } = state;
      return loop(
        {
          ...state,
          isRequesting: true,
          errorMsg: null,
          apiName: 'check'
        },
        Effects.promise(_callDoubleCheck, formData)
      );
    }
    case actions.GOTO_DONE: {
      return loop(
        state,
        Effects.promise(_gotoDone)
      );
    }
    case actions.STORE_NAME_REQUESTED: {
      return loop(
        {
          ...state,
          isRequesting: true,
          errorMsg: null,
          apiName: 'name'
        },
        Effects.promise(_storeName, action.name)
      );
    }
    case actions.STORE_PHONE_REQUESTED: {
      return loop(
        {
          ...state,
          isRequesting: true,
          errorMsg: null,
          apiName: 'phone'
        },
        Effects.promise(_storePhone, action.phone)
      );
    }
    case actions.STORE_NAME_SUCCEEDED: {
      return loop(
        {
          ...state,
          formData: {
            ...state.formData,
            name: action.name
          }
        },
        Effects.constant(actions.maybeGotoNext())
      );
    }
    case actions.STORE_PHONE_SUCCEEDED: {
      return loop(
        {
          ...state,
          formData: {
            ...state.formData,
            phone: action.phone
          }
        },
        Effects.constant(actions.maybeGotoNext())
      );
    }
    case actions.CALL_DOUBLE_CHECK_SUCCEEDED: {
      return loop(
        {
          ...state,
          isRequesting: false,
          errorMsg: null
        },
        Effects.constant(actions.skipNext())
      );
    }
    case actions.CALL_DOUBLE_CHECK_FAILED: {
      return loop(
        {
          ...state,
          isRequesting: false,
          errorMsg: action.errorMsg
        },
        Effects.constant(actions.gotoNext())
      );
    }
    case actions.STORE_NAME_FAILED:
    case actions.STORE_PHONE_FAILED: {
      return {
        ...state,
        isRequesting: false,
        errorMsg: action.errorMsg
      };
    }
    default:
      return state;
  }
}

// NOTE: some of these functions are exported for testing only
export function alwaysShow() {
  return Promise.resolve(actions.gotoNext());
}

export function shouldShowDoubleCheck() {
  return Promise.resolve(actions.callDoubleCheck());
}

export function _maybeGotoRoute(nextRoute) {
  return new Promise((resolve) => {
    const shouldShowFn = SHOULD_SHOW_MAP[nextRoute];
    resolve(actions.checkShouldShow(shouldShowFn));
  });
}

export function _gotoRoute(nextRoute) {
  return new Promise((resolve) => {
    hashHistory.push(nextRoute);
    resolve(actions.dummyAction());
  });
}

export function _gotoDone() {
  return _gotoRoute('/done');
}

export function _callDoubleCheck(formData) {
  return request('/api/check', formData)
    .then(() => {
      return actions.callDoubleCheckSucceeded();
    })
    .catch((error) => {
      return actions.callDoubleCheckFailed(error);
    });
}

export function _storeName(name) {
  return request('/api/name', name)
    .then(() => {
      return actions.storeNameSucceeded(name);
    })
    .catch((error) => {
      return actions.storeNameFailed(error);
    });
}

export function _storePhone(phone) {
  return request('/api/phone', phone)
    .then(() => {
      return actions.storePhoneSucceeded(phone);
    })
    .catch((error) => {
      return actions.storePhoneFailed(error);
    });
}

export default modalsReducer;
