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

export function _gotoIndex(index) {
  return async (dispatch, getState) => {
    const { modalList } = getState();
    const nextRoute = modalList[index];
    const shouldShowFn = SHOULD_SHOW_MAP[nextRoute];
    const shouldShow = await shouldShowFn(dispatch, getState);

    if (shouldShow) {
      hashHistory.push(nextRoute);
    } else {
      dispatch(_gotoIndex(index + 1));
    }
  }
}

function alwaysShow() {
  return true;
}

async function shouldShowDoubleCheck(dispatch, getState) {
  const { formData } = getState();

  dispatch(_callDoubleCheckRequested());
  try {
    await request('/api/check', formData);
    dispatch(_callDoubleCheckSucceeded());
    return false;
  } catch (error) {
    dispatch(_callDoubleCheckFailed(error));
    return true;
  }
}

export function gotoDone() {
  return () => {
    hashHistory.push('/done');
  }
}

export function storeName(name, onSuccess) {
  return async dispatch => {
    dispatch(_storeNameRequested());
    try {
      await request('/api/name', name);
      dispatch(_storeNameSucceeded(name));
      onSuccess();
    } catch(error) {
      dispatch(_storeNameFailed(error));
    }
  }
}

export function storePhone(phone, onSuccess) {
  return async dispatch => {
    dispatch(_storePhoneRequested());
    try {
      await request('/api/phone', phone);
      dispatch(_storePhoneSucceeded(phone));
      onSuccess();
    } catch(error) {
      dispatch(_storePhoneFailed(error));
    }
  }
}

function _storeNameRequested() {
  return {
    type: STORE_NAME_REQUESTED,
    apiName: 'name'
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
    type: STORE_PHONE_REQUESTED,
    apiName: 'phone'
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
    type: CALL_DOUBLE_CHECK_REQUESTED,
    apiName: 'check'
  };
}

function _callDoubleCheckSucceeded() {
  return {
    type: CALL_DOUBLE_CHECK_SUCCEEDED
  };
}

function _callDoubleCheckFailed(errorMsg) {
  return {
    type: CALL_DOUBLE_CHECK_FAILED,
    errorMsg: errorMsg
  };
}
