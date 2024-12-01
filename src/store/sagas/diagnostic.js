import { call, put, fork } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import api from '~/services/api';

import DiagnosticActions from '~/store/ducks/diagnostics';

function* saveDiagnosticImage(data) {
  const { id, imageData } = data;
  try {
    yield put(DiagnosticActions.saveDiagnosticImageRequest());
    yield call(api.post, `/diagnostics/${id}/image`, imageData);
    yield put(DiagnosticActions.saveDiagnosticImageSuccess());
  } catch (error) {
    Sentry.captureException(error);
    yield put(DiagnosticActions.saveDiagnosticImageFailure(error));
  }
}

export function* saveDiagnostic(action) {
  const {
    label,
    score,
    latitude,
    longitude,
    imageUri,
    labels,
    scores,
    saved,
  } = action.payload;

  try {
    const response = yield call(api.post, '/diagnostics', {
      label,
      score,
      latitude,
      longitude,
      labels,
      scores,
      saved,
      deleted: false,
    });

    // eslint-disable-next-line no-undef
    const imagesData = new FormData();

    imagesData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `user${response.data.user_id}diagnose${
        response.data.id
      }_${response.data.label.replace(' ', '_')}.jpg`,
    });

    const payload = { id: response.data.id, imageData: imagesData };
    yield fork(saveDiagnosticImage, payload);

    yield put(DiagnosticActions.saveDiagnosticSuccess());
  } catch (error) {
    Sentry.captureException(error);
    yield put(DiagnosticActions.saveDiagnosticFailure(error));
  }
}

export function* getAllDiagnostics() {
  try {
    const response = yield call(api.get, '/diagnostics');

    yield put(DiagnosticActions.getAllDiagnosticsSuccess(response));
  } catch (error) {
    Sentry.captureException(error);
    yield put(DiagnosticActions.getAllDiagnosticsFailure(error));
  }
}

export function* deleteDiagnostic(action) {
  const { id } = action.payload;

  try {
    yield call(api.put, `/diagnostics/${id}`, {
      deleted: true,
    });

    yield put(DiagnosticActions.deleteDiagnosticSuccess());
  } catch (error) {
    Sentry.captureException(error);
    yield put(DiagnosticActions.deleteDiagnosticFailure(error));
  }
}
