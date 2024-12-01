/**
 * Action Types
 */
export const Types = {
  LOGOUT_REQUEST: 'logout/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'logout/LOGOUT_SUCCESS',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
};

export default function logout(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case Types.LOGOUT_SUCCESS:
      return { state, email: null };
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export const Creators = {
  logoutRequest: () => ({
    type: Types.LOGOUT_REQUEST,
  }),
  logoutSuccess: () => ({
    type: Types.LOGOUT_SUCCESS,
  }),
};
