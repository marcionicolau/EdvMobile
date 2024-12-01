import { call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import api from '~/services/api';
import { navigate } from '~/services/navigation';

import { Creators as UsersActions } from '~/store/ducks/users';

export function* createUser(action) {
  try {
    const {
      fullname, email, password, passwordConfirmation,
    } = action.payload;
    yield call(api.post, '/users', {
      fullname,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    yield put(UsersActions.createUserSuccess());
    navigate('SignIn');
  } catch (error) {
    Sentry.captureException(error);
    yield put(
      UsersActions.createUserFailure({
        message: error.message,
      }),
    );
  }
}
