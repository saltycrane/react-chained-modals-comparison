import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_SUCCEEDED,
  STORE_NAME_FAILED,
  STORE_PHONE_REQUESTED,
  STORE_PHONE_SUCCEEDED,
  STORE_PHONE_FAILED
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
        requestStatus: null,
        currIndex: index
      };
    }
    case STORE_NAME_REQUESTED:
    case STORE_PHONE_REQUESTED: {
      return {
        ...state,
        isRequesting: true,
        errorMsg: null
      }
    }
    case STORE_NAME_SUCCEEDED:
    case STORE_PHONE_SUCCEEDED: {
      return {
        ...state,
        isRequesting: false,
        errorMsg: null
      }
    }
    case STORE_NAME_FAILED:
    case STORE_PHONE_FAILED: {
      return {
        ...state,
        isRequesting: false,
        errorMsg: action.errorMsg
      }
    }
    default:
      return state;
  }
}

function _formData(state, action) {
  switch (action.type) {
    case STORE_NAME_SUCCEEDED: {
      return {
        ...state,
        name: action.name
      }
    }
    case STORE_PHONE_SUCCEEDED: {
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
