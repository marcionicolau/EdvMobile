import { put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import { navigate } from '~/services/navigation';

import { Creators as LogoutActions } from '~/store/ducks/logout';

export function* logout() {
  yield AsyncStorage.removeItem('@EdvMobileApp:token');
  yield put(LogoutActions.logoutSuccess());
  navigate('SignIn');
}
