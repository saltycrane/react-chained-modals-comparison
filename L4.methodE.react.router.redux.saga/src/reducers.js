import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_SUCCEEDED,
  STORE_NAME_FAILED,
  STORE_PHONE_REQUESTED,
  STORE_PHONE_SUCCEEDED,
  STORE_PHONE_FAILED,
  CALL_DOUBLE_CHECK_REQUESTED,
  CALL_DOUBLE_CHECK_SUCCEEDED,
  CALL_DOUBLE_CHECK_FAILED
} from './actions';


const initialState = {
  modalList: [
    '/name',
    '/phone',
    '/check',
    '/done'
  ],
  currIndex: null,
  errorMsg: null,
  apiName: null,
  requestStatus: null,
  formData: {
    name: 'Backend',
    phone: null
  }
};

function modalsReducer(state = initialState, action) {
  return {
    ..._sequencing(state, action),
    formData: _formData(state.formData, action)
  }
}

function _sequencing(state, action) {
  switch (action.type) {
    case ROUTE_CHANGED:
      const { location: { pathname } } = action;
      const index = state.modalList.findIndex(path => path === pathname);

      return {
        ...state,
        requestStatus: null,
        currIndex: index
      };

    case STORE_NAME_REQUESTED:
      return {
        ...state,
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'name'
      };

    case STORE_PHONE_REQUESTED:
      return {
        ...state,
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'phone'
      };

    case CALL_DOUBLE_CHECK_REQUESTED:
      return {
        ...state,
        requestStatus: 'REQUESTING',
        errorMsg: null,
        apiName: 'check'
      };

    case STORE_NAME_SUCCEEDED:
    case STORE_PHONE_SUCCEEDED:
    case CALL_DOUBLE_CHECK_SUCCEEDED:
      return {
        ...state,
        requestStatus: 'SUCCEEDED',
        errorMsg: null
      };

    case STORE_NAME_FAILED:
    case STORE_PHONE_FAILED:
    case CALL_DOUBLE_CHECK_FAILED:
      return {
        ...state,
        requestStatus: 'FAILED',
        errorMsg: action.errorMsg
      };

    default:
      return state;
  }
}

function _formData(state, action) {
  switch (action.type) {
    case STORE_NAME_SUCCEEDED:
      return {
        ...state,
        name: action.name
      };

    case STORE_PHONE_SUCCEEDED:
      return {
        ...state,
        phone: action.phone
      };

    default:
      return state;
  }
}

export default modalsReducer;
