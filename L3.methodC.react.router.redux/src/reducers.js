import {
  ROUTE_CHANGED,
  STORE_NAME,
  STORE_PHONE
} from './actions';


function modalsReducer(state, action) {
  return {
    ..._sequencing(state, action),
    formData: _formData(state.formData, action)
  }
}

function _sequencing(state, action) {
  switch (action.type) {
    case ROUTE_CHANGED: {
      const { location: { pathname } } = action;
      const index = state.modalList.findIndex(path => path === pathname);
      return {
        ...state,
        currIndex: index
      };
    }
    default:
      return state;
  }
}

function _formData(state, action) {
  switch (action.type) {
    case STORE_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case STORE_PHONE: {
      return {
        ...state,
        phone: action.phone
      }
    }
    default:
      return state;
  }
}

export default modalsReducer;
