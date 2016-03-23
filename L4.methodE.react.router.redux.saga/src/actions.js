export const GOTO_NEXT = 'GOTO_NEXT';
export const GOTO_DONE = 'GOTO_DONE';
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

export function storeName(name, onSuccess) {
  return {
    type: STORE_NAME_REQUESTED,
    apiName: 'name',
    name: name,
    onSuccess: onSuccess
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

export function storePhone(phone, onSuccess) {
  return {
    type: STORE_PHONE_REQUESTED,
    apiName: 'phone',
    phone: phone,
    onSuccess: onSuccess
  };
}

export function storePhoneSucceeded(phone) {
  return {
    type: STORE_PHONE_SUCCEEDED,
    phone: phone,
    apiName: 'phone'
  };
}

export function storePhoneFailed(errorMsg) {
  return {
    type: STORE_PHONE_FAILED,
    errorMsg: errorMsg
  };
}

export function callDoubleCheck() {
  return {
    type: CALL_DOUBLE_CHECK_REQUESTED,
    apiName: 'check'
  };
}

export function callDoubleCheckSucceeded() {
  return {
    type: CALL_DOUBLE_CHECK_SUCCEEDED
  };
}

export function callDoubleCheckFailed(errorMsg) {
  return {
    type: CALL_DOUBLE_CHECK_FAILED,
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
  return {
    type: GOTO_NEXT
  };
}

export function gotoDone() {
  return {
    type: GOTO_DONE
  };
}
