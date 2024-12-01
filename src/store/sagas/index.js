import {
  all, takeLatest, takeEvery, spawn,
} from 'redux-saga/effects';

import { Types as LoginTypes } from '~/store/ducks/login';
import { Types as LogoutTypes } from '~/store/ducks/logout';
import { Types as UsersTypes } from '~/store/ducks/users';
import { DiagnosticTypes } from '~/store/ducks/diagnostics';

import { login } from './login';
import { logout } from './logout';
import { createUser } from './users';
import {
  saveDiagnostic,
  getAllDiagnostics,
  deleteDiagnostic,
} from './diagnostic';
import { startWatchingNetworkConnection } from './offline';

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnection),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LogoutTypes.LOGOUT_REQUEST, logout),
    takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),
    takeEvery(DiagnosticTypes.SAVE_DIAGNOSTIC_REQUEST, saveDiagnostic),
    takeEvery(DiagnosticTypes.GET_ALL_DIAGNOSTICS_REQUEST, getAllDiagnostics),
    takeLatest(DiagnosticTypes.DELETE_DIAGNOSTIC_REQUEST, deleteDiagnostic),
  ]);
}
