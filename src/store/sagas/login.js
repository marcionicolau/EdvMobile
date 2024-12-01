import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';

import api from '~/services/api';
import { navigate } from '~/services/navigation';

import { Creators as LoginActions } from '~/store/ducks/login';

export function* login(action) {
  try {
    const { email, password } = action.payload;

    const {
      data: { token },
    } = yield call(api.post, '/sessions', { email, password });

    AsyncStorage.setItem('@EdvMobileApp:token', token);
    yield put(LoginActions.loginSuccess(email));
    navigate('App');
  } catch (error) {
    const { field, message } = error.response.data;
    Sentry.captureException(error);
    yield put(LoginActions.loginFailure({ field, message }));
  }
}
