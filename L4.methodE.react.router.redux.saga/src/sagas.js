import { hashHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

import { request } from './request-simulator';
import * as actions from './actions';


// Note: some functions are exported for testing purposes only

const SHOULD_SHOW_MAP = {
  '/name': alwaysShow,
  '/phone': alwaysShow,
  '/check': shouldShowDoubleCheck,
  '/done': alwaysShow
};

function *gotoNext() {
  const { currIndex } = yield select();

  yield *gotoIndex(currIndex + 1);
}

function *gotoIndex(nextIndex) {
  const state = yield select();
  const { modalList } = state;
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

export function *shouldShowDoubleCheck() {
  const { formData } = yield select();

  yield put(actions.callDoubleCheck());
  try {
    yield call(request, '/api/check', formData);
    yield put(actions.callDoubleCheckSucceeded());
    return false;
  } catch (error) {
    yield put(actions.callDoubleCheckFailed(error));
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

export function *storePhone(action) {
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
