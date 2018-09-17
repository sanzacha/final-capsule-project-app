import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  getUserName,
  getCurrentUserNameService,
  getMessagesService,
  getCreateRoomService,
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

  yield put({ type: 'SET_CURRENT_USER_NAME', currentUserName });
}

function* getMessages(action) {
  const messages = yield call(getMessagesService, action);
  yield put({ type: 'SET_MESSAGES', messages });
}

function* getCreateRoom(action) {
  const room = yield call(getCreateRoomService, action);
  yield put({ type: 'SET_CREATE_ROOM', room });
}

export default function* sagas() {
  yield takeLatest('GET_USER_NAME', userName);
  yield takeLatest('GET_CURRENT_USER_NAME', getCurrentUserName);
  yield takeLatest('GET_MESSAGES', getMessages);
  yield takeLatest('GET_CREATE_ROOM', getCreateRoom);
}
