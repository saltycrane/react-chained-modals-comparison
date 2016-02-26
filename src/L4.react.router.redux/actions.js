export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';
export const STORE_NAME = 'STORE_NAME';
export const STORE_PHONE = 'STORE_PHONE';

export function setCurrentIndex(currIndex) {
  return {
    type: SET_CURRENT_INDEX,
    currIndex: currIndex
  }
}

export function storeName(name) {
  return {
    type: STORE_NAME,
    name: name
  };
}

export function storePhone(phone) {
  return {
    type: STORE_PHONE,
    phone: phone
  };
}
