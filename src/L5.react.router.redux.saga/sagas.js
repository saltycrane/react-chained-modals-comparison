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

function *storeName(action) {
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

function *gotoNext() {
  const state = yield select();
  const { currIndex } = state;

  yield *gotoIndex(currIndex + 1);
}

function *gotoIndex(nextIndex) {
  const state = yield select();
  const { modalList } = state;
  const nextRoute = modalList[nextIndex];
  const shouldShowFn = SHOULD_SHOW_MAP[nextRoute];
  const shouldShow = yield call(shouldShowFn, state);

  if (shouldShow) {
    hashHistory.push(nextRoute);
  } else {
    yield *gotoIndex(nextIndex + 1);
  }
}

function *gotoDone() {
  hashHistory.push('/done');
}

function alwaysShow() {
  return Promise.resolve(true);
}

function shouldShowCheck(state) {
  const { formData } = state;

  return request('/api/check', formData)
    .then(() => false)
    .catch(() => true);
}

function *watchStoreName() {
  yield *takeEvery(actions.STORE_NAME_REQUESTED, storeName);
}

function *watchStorePhone() {
  yield *takeEvery(actions.STORE_PHONE_REQUESTED, storePhone);
}

function *watchGotoNext() {
  yield *takeEvery(actions.GOTO_NEXT, gotoNext);
}

function *watchGotoDone() {
  yield *takeEvery(actions.GOTO_DONE, gotoDone);
}

export default function *modals() {
  yield [
    fork(watchStoreName),
    fork(watchStorePhone),
    fork(watchGotoNext),
    fork(watchGotoDone)
  ]
}
