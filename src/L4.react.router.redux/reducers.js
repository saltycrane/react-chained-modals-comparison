import {
  SET_CURRENT_INDEX,
  STORE_NAME,
  STORE_PHONE
} from './actions';


const initialState = {
  currIndex: null,
  formData: {
    name: null,
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
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currIndex: action.currIndex
      };
    default:
      return state;
  }
}

function _formData(state, action) {
  switch (action.type) {
    case STORE_NAME:
      return {
        ...state,
        name: action.name
      }
    case STORE_PHONE:
      return {
        ...state,
        phone: action.phone
      }
    default:
      return state;
  }
}

export default modalsReducer;
