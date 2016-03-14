import { hashHistory } from 'react-router';

import { request } from './request-simulator';


const SHOULD_SHOW_MAP = {
  '/name': alwaysShow,
  '/phone': alwaysShow,
  '/check': shouldShowDoubleCheck,
  '/done': alwaysShow
};

export const ROUTE_CHANGED = 'ROUTE_CHANGED';
export const STORE_NAME_REQUESTED = 'STORE_NAME_REQUESTED';
export const STORE_NAME_SUCCEEDED = 'STORE_NAME_SUCCEEDED';
export const STORE_NAME_FAILED = 'STORE_NAME_FAILED';
export const STORE_PHONE_REQUESTED = 'STORE_PHONE_REQUESTED';
export const STORE_PHONE_SUCCEEDED = 'STORE_PHONE_SUCCEEDED';
export const STORE_PHONE_FAILED = 'STORE_PHONE_FAILED';
export const CALL_DOUBLE_CHECK_REQUESTED = 'CALL_DOUBLE_CHECK_REQUESTED';
export const CALL_DOUBLE_CHECK_SUCCEEDED = 'CALL_DOUBLE_CHECK_SUCCEEDED';
export const CALL_DOUBLE_CHECK_FAILED = 'CALL_DOUBLE_CHECK_FAILED';

function _storeNameRequested() {
  return {
    type: STORE_NAME_REQUESTED
  };
}

function _storeNameSucceeded(name) {
  return {
    type: STORE_NAME_SUCCEEDED,
    name: name
  };
}

function _storeNameFailed(errorMsg) {
  return {
    type: STORE_NAME_FAILED,
    errorMsg: errorMsg
  };
}

function _storePhoneRequested() {
  return {
    type: STORE_PHONE_REQUESTED
  };
}

function _storePhoneSucceeded(phone) {
  return {
    type: STORE_PHONE_SUCCEEDED,
    phone: phone
  };
}

function _storePhoneFailed(errorMsg) {
  return {
    type: STORE_PHONE_FAILED,
    errorMsg: errorMsg
  };
}

function _callDoubleCheckRequested() {
  return {
    type: CALL_DOUBLE_CHECK_REQUESTED
  };
}

function _callDoubleCheckSucceeded() {
  return {
    type: CALL_DOUBLE_CHECK_SUCCEEDED
  };
}

function _callDoubleCheckFailed() {
  return {
    type: CALL_DOUBLE_CHECK_FAILED
  };
}

export function routeChanged(location) {
  return {
    type: ROUTE_CHANGED,
    location: location
  }
}

export function gotoNext() {
  return (dispatch, getState) => {
    const { currIndex } = getState();

    dispatch(_gotoIndex(currIndex + 1));
  };
}

function _gotoIndex(index) {
  return (dispatch, getState) => {
    const { modalList } = getState();
    const nextRoute = modalList[index];
    const shouldShow = SHOULD_SHOW_MAP[nextRoute];

    shouldShow(dispatch, getState)
      .then(() => {
        hashHistory.push(nextRoute);
      })
      .catch(() => {
        dispatch(_gotoIndex(index + 1));
      });
  }
}

export function alwaysShow() {
  return Promise.resolve();
}

export function shouldShowDoubleCheck(dispatch, getState) {
  const { formData } = getState();

  // create a new promise here to invert the resolve/reject
  // i.e. a resolve from the API causes a reject here and vice versa
  // is there a better way to do this?
  return new Promise(function (resolve, reject) {
    dispatch(_callDoubleCheckRequested());
    request('/api/check', formData)
      .then(() => {
        dispatch(_callDoubleCheckSucceeded());
        reject('double check view is not required');
      })
      .catch(() => {
        dispatch(_callDoubleCheckFailed());
        resolve('double check view is required due to failed validation');
      });
  });
}

export function gotoDone() {
  return () => {
    hashHistory.push('/done');
  }
}

export function storeName(name) {
  return dispatch => {
    dispatch(_storeNameRequested());
    return request('/api/name', name)
      .then(() => {
        dispatch(_storeNameSucceeded(name));
        dispatch(gotoNext());
      })
      .catch(error => {
        dispatch(_storeNameFailed(error));
      });
  }
}

export function storePhone(phone) {
  return dispatch => {

    dispatch(_storePhoneRequested());
    return request('/api/phone', phone)
      .then(() => {
        dispatch(_storePhoneSucceeded(phone));
        dispatch(gotoNext());
      })
      .catch(error => {
        dispatch(_storePhoneFailed(error));
      });
  }
}
