import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  getUserName,
  getCurrentUserNameService,
  getMessagesService,
} from './services';

function* userName(action) {
  const username = yield call(getUserName, action.username);
  yield put({ type: 'SET_USER_NAME', username });
}

function* getCurrentUserName(action) {

  const currentUserName = yield call(
    getCurrentUserNameService,
    action.currentUserName,
  );

  console.log('action::', currentUserName);

  yield put({ type: 'SET_CURRENT_USER_NAME', currentUserName });
}

function* getMessages(action) {
  const messages = yield call(getMessagesService, action);
  console.log("saga-" + messages);
  yield put({ type: 'SET_MESSAGES', messages });
}

export default function* sagas() {
  yield takeLatest('GET_USER_NAME', userName);
  yield takeLatest('GET_CURRENT_USER_NAME', getCurrentUserName);
  yield takeLatest('GET_MESSAGES', getMessages);
}
