export const GOTO_NEXT = 'GOTO_NEXT';
export const GOTO_DONE = 'GOTO_DONE';
export const ROUTE_CHANGED = 'ROUTE_CHANGED';
export const STORE_NAME_REQUESTED = 'STORE_NAME_REQUESTED';
export const STORE_NAME_SUCCEEDED = 'STORE_NAME_SUCCEEDED';
export const STORE_NAME_FAILED = 'STORE_NAME_FAILED';
export const STORE_PHONE_REQUESTED = 'STORE_PHONE_REQUESTED';
export const STORE_PHONE_SUCCEEDED = 'STORE_PHONE_SUCCEEDED';
export const STORE_PHONE_FAILED = 'STORE_PHONE_FAILED';
export const CALL_CHECK_REQUESTED = 'CALL_CHECK_REQUESTED';
export const CALL_CHECK_SUCCEEDED = 'CALL_CHECK_SUCCEEDED';
export const CALL_CHECK_FAILED = 'CALL_CHECK_FAILED';

export function storeName(name) {
  return {
    type: STORE_NAME_REQUESTED,
    name: name
  };
}

export function storeNameSucceeded(name) {
  return {
    type: STORE_NAME_SUCCEEDED,
    name: name
  };
}

export function storeNameFailed(errorMsg) {
  return {
    type: STORE_NAME_FAILED,
    errorMsg: errorMsg
  };
}

export function storePhone(phone) {
  return {
    type: STORE_PHONE_REQUESTED,
    phone: phone
  };
}

export function storePhoneSucceeded(phone) {
  return {
    type: STORE_PHONE_SUCCEEDED,
    phone: phone
  };
}

export function storePhoneFailed(errorMsg) {
  return {
    type: STORE_PHONE_FAILED,
    errorMsg: errorMsg
  };
}

export function callCheck() {
  return {
    type: CALL_CHECK_REQUESTED
  };
}

export function callCheckSucceeded() {
  return {
    type: CALL_CHECK_SUCCEEDED
  };
}

export function callCheckFailed() {
  return {
    type: CALL_CHECK_FAILED
  };
}

export function routeChanged(location) {
  return {
    type: ROUTE_CHANGED,
    location: location
  }
}

export function gotoNext() {
  return {
    type: GOTO_NEXT
  };
}

export function gotoDone() {
  return {
    type: GOTO_DONE
  };
}
