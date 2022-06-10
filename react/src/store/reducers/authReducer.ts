import * as types from '../../models/actions';

interface StateProps {
  logged: boolean;
  name: string;
  users: any[];
  posts: any[];
  remember: boolean;
}

const stateInit: StateProps = {
  logged: false,
  name: '',
  users: [],
  posts: [],
  remember: false
};

export const authReducer = (state: StateProps = stateInit, action: types.AuthActions) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        logged: true,
        name: action.payload.name,
        remember: action.payload.remember
      };
    case types.LOGOUT:
      return {
        ...stateInit
      };
    case types.ADD_USERS:
      return {
        ...state,
        logged: true,
        users: action.payload
      };
    case types.ADD_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};
