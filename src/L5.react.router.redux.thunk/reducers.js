import {
  ROUTE_CHANGED,
  STORE_NAME_REQUESTED,
  STORE_NAME_SUCCEEDED,
  STORE_NAME_FAILED,
  STORE_PHONE_REQUESTED,
  STORE_PHONE_SUCCEEDED,
  STORE_PHONE_FAILED,
  alwaysShow,
  shouldShowCheck
} from './actions';


const initialState = {
  modalList: [
    '/name',
    '/phone',
    '/check',
    '/done'
  ],
  shouldShowList: [
    alwaysShow,  // always show /name
    alwaysShow,  // always show /phone
    shouldShowCheck,  // conditionally show /check
    alwaysShow  // always show /done
  ],
  currIndex: null,
  errorMsg: null,
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
    case STORE_PHONE_REQUESTED:
      return {
        ...state,
        requestStatus: 'REQUESTING',
        errorMsg: null
      }

    case STORE_NAME_SUCCEEDED:
    case STORE_PHONE_SUCCEEDED:
      return {
        ...state,
        requestStatus: 'SUCCEEDED',
        errorMsg: null
      }

    case STORE_NAME_FAILED:
    case STORE_PHONE_FAILED:
      return {
        ...state,
        requestStatus: 'FAILED',
        errorMsg: action.errorMsg
      }

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
      }

    case STORE_PHONE_SUCCEEDED:
      return {
        ...state,
        phone: action.phone
      }

    default:
      return state;
  }
}

export default modalsReducer;
