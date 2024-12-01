/**
 * Action Types
 */
export const Types = {
  LOGIN_REQUEST: 'login/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'login/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'login/LOGIN_FAILURE',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  email: null,
  loading: false,
  error: false,
  errorContent: null,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        error: false,
        loading: false,
        errorContent: null,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorContent: action.payload.errorContent,
      };
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export const Creators = {
  loginRequest: (email, password) => ({
    type: Types.LOGIN_REQUEST,
    payload: { email, password },
  }),

  loginSuccess: (email) => ({
    type: Types.LOGIN_SUCCESS,
    payload: { email },
  }),

  loginFailure: (errorContent) => ({
    type: Types.LOGIN_FAILURE,
    payload: { errorContent },
  }),
};
