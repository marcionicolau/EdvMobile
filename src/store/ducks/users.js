/**
 * Action Types
 */
export const Types = {
  CREATE_USER_REQUEST: 'users/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'users/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'users/CREATE_USER_FAILURE',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  error: false,
  fullname: null,
  email: null,
  password: null,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_USER_FAILURE:
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
  createUserRequest: (fullname, email, password, passwordConfirmation) => ({
    type: Types.CREATE_USER_REQUEST,
    payload: {
      fullname,
      email,
      password,
      passwordConfirmation,
    },
  }),
  createUserSuccess: () => ({
    type: Types.CREATE_USER_SUCCESS,
  }),
  createUserFailure: (errorContent) => ({
    type: Types.CREATE_USER_FAILURE,
    payload: { errorContent },
  }),
};
