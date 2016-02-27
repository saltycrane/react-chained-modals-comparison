import { hashHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

import { request } from '../request-simulator';
import * as actions from './actions';


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
  const { modalList, shouldShowList } = state;
  const nextRoute = modalList[nextIndex];
  const shouldShow = shouldShowList[nextIndex];

  try {
    yield call(shouldShow, state);
    hashHistory.push(nextRoute);
  } catch (e) {
    yield *gotoIndex(nextIndex + 1);
  }
}

function *gotoDone() {
  hashHistory.push('/done');
}

export function alwaysShow() {
  return Promise.resolve();
}

export function shouldShowCheck(state) {
  const { formData } = state;

  // create a new promise here to invert the resolve/reject
  // i.e. a resolve from the API causes a reject here and vice versa
  // is there a better way to do this?
  return new Promise(function (resolve, reject) {
    request('/api/check', formData)
      .then(() => {
        reject('check view is not required');
      })
      .catch(() => {
        resolve('check view is required due to failed validation');
      });
      // .catch((error) => {
      //   console.error(error.stack);
      // });
  });
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
