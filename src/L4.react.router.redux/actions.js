export const ROUTE_CHANGED = 'ROUTE_CHANGED';
export const STORE_NAME = 'STORE_NAME';
export const STORE_PHONE = 'STORE_PHONE';

export function routeChanged(location) {
  return {
    type: ROUTE_CHANGED,
    location: location
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
