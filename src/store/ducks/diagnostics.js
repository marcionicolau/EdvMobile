import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { markActionsOffline } from 'redux-offline-queue';

/**
 * Types & Action Creators
 */

const { Types, Creators } = createActions({
  deleteDiagnosticRequest: ['payload'],
  deleteDiagnosticSuccess: null,
  deleteDiagnosticFailure: ['error'],
  saveDiagnosticRequest: ['payload'],
  saveDiagnosticSuccess: null,
  saveDiagnosticFailure: ['error'],
  saveDiagnosticImageRequest: null,
  saveDiagnosticImageSuccess: null,
  saveDiagnosticImageFailure: ['error'],
  getAllDiagnosticsRequest: null,
  getAllDiagnosticsSuccess: ['payload'],
  getAllDiagnosticsFailure: ['error'],
});

markActionsOffline(Creators, [
  'saveDiagnosticRequest',
  'saveDiagnosticImageRequest',
  'deleteDiagnosticRequest',
]);

export const DiagnosticTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  errorMessage: '',
  error: false,
  saveStatus: '',
  imageStatus: '',
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_DIAGNOSTIC_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.DELETE_DIAGNOSTIC_SUCCESS]: (state) => state.merge({ loading: false, error: false }),
  [Types.DELETE_DIAGNOSTIC_FAILURE]: (state, { error }) => state.merge({
    loading: false,
    error: true,
    errorMessage: error,
  }),
  [Types.SAVE_DIAGNOSTIC_REQUEST]: (state) => state.merge({ loading: true, saveStatus: 'sending' }),
  [Types.SAVE_DIAGNOSTIC_SUCCESS]: (state) => state.merge({ loading: false, error: false, saveStatus: 'success' }),
  [Types.SAVE_DIAGNOSTIC_FAILURE]: (state, { error }) => state.merge({
    loading: false,
    error: true,
    saveStatus: 'failure',
    errorMessage: error,
  }),
  [Types.SAVE_DIAGNOSTIC_IMAGE_REQUEST]: (state) => state.merge({ loading: true, imageStatus: 'uploading' }),
  [Types.SAVE_DIAGNOSTIC_IMAGE_SUCCESS]: (state) => state.merge({
    loading: false,
    error: false,
    imageStatus: 'success',
  }),
  [Types.SAVE_DIAGNOSTIC_IMAGE_FAILURE]: (state, { error }) => state.merge({
    loading: false,
    error: true,
    errorMessage: error,
    imageStatus: 'failure',
  }),
  [Types.GET_ALL_DIAGNOSTICS_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.GET_ALL_DIAGNOSTICS_SUCCESS]: (state, { payload }) => state.merge({
    loading: false,
    error: false,
    data: payload.data,
  }),
  [Types.GET_ALL_DIAGNOSTICS_FAILURE]: (state, { error }) => state.merge({
    loading: false,
    error: true,
    errorMessage: error,
  }),
});
