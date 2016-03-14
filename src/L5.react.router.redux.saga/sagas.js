import { hashHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

import { request } from '../request-simulator';
import * as actions from './actions';


const SHOULD_SHOW_MAP = {
  '/name': alwaysShow,
  '/phone': alwaysShow,
  '/check': shouldShowCheck,
  '/done': alwaysShow
};

// selectors
function getCurrIndex(state) {
  return state.currIndex;
}

function getModalList(state) {
  return state.modalList;
}

function getFormData(state) {
  return state.formData;
}

// Note: some of these functions are exported for testing only

function *gotoNext() {
  const currIndex = yield select(getCurrIndex);

  yield *gotoIndex(currIndex + 1);
}

function *gotoIndex(nextIndex) {
  const modalList = yield select(getModalList);
  const nextRoute = modalList[nextIndex];
  const shouldShowFn = SHOULD_SHOW_MAP[nextRoute];
  const shouldShow = yield* shouldShowFn();

  if (shouldShow) {
    hashHistory.push(nextRoute);
  } else {
    yield *gotoIndex(nextIndex + 1);
  }
}

function *alwaysShow() {
  return true;
}

function *shouldShowCheck() {
  const formData = yield select(getFormData);

  yield put(actions.callCheck());
  try {
    yield call(request, '/api/check', formData);
    yield put(actions.callCheckSucceeded());
    return false;
  } catch (e) {
    yield put(actions.callCheckFailed());
    return true;
  }
}

function *gotoDone() {
  hashHistory.push('/done');
}

export function *storeName(action) {
  const { name } = action;

  try {
    yield call(request, '/api/name', name);
    yield put(actions.storeNameSucceeded(name));
    yield put(actions.gotoNext());
  } catch (e) {
    yield put(actions.storeNameFailed(e));
  }
}

function *storePhone(action) {
  const { phone } = action;

  try {
    yield call(request, '/api/phone', phone);
    yield put(actions.storePhoneSucceeded(phone));
    yield put(actions.gotoNext());
  } catch (e) {
    yield put(actions.storePhoneFailed(e));
  }
}

function *watchGotoNext() {
  yield *takeEvery(actions.GOTO_NEXT, gotoNext);
}

function *watchGotoDone() {
  yield *takeEvery(actions.GOTO_DONE, gotoDone);
}

function *watchStoreName() {
  yield *takeEvery(actions.STORE_NAME_REQUESTED, storeName);
}

function *watchStorePhone() {
  yield *takeEvery(actions.STORE_PHONE_REQUESTED, storePhone);
}

export default function *modals() {
  yield [
    fork(watchGotoNext),
    fork(watchGotoDone),
    fork(watchStoreName),
    fork(watchStorePhone)
  ]
}
