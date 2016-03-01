import { hashHistory } from 'react-router';

import { request } from '../request-simulator';


const SHOULD_SHOW_MAP = {
  '/name': alwaysShow,
  '/phone': alwaysShow,
  '/check': shouldShowCheck,
  '/done': alwaysShow
};

export const ROUTE_CHANGED = 'ROUTE_CHANGED';
export const STORE_NAME_REQUESTED = 'STORE_NAME_REQUESTED';
export const STORE_NAME_SUCCEEDED = 'STORE_NAME_SUCCEEDED';
export const STORE_NAME_FAILED = 'STORE_NAME_FAILED';
export const STORE_PHONE_REQUESTED = 'STORE_PHONE_REQUESTED';
export const STORE_PHONE_SUCCEEDED = 'STORE_PHONE_SUCCEEDED';
export const STORE_PHONE_FAILED = 'STORE_PHONE_FAILED';

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

export function shouldShowCheck(dispatch, getState) {
  const { formData } = getState();

  // create a new promise here to invert the resolve/reject
  // i.e. a resolve from the API causes a reject here and vice versa
  // is there a better way to do this?
  return new Promise(function (resolve, reject) {
    request('/api/check', formData)
      .then(() => {
        reject('check view is not required');
      })
      .catch(() => {
        resolve('check view is required due to failed validation');
      });
      // .catch((error) => {
      //   console.error(error.stack);
      // });
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
      // .catch(error => {
      //   console.error(error.stack);
      // });
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
      // .catch(error => {
      //   console.error(error.stack);
      // });
  }
}
