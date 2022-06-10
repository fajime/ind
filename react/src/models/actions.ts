export const LOGIN = 'Auth Login';
export type LOGIN_TYPE = typeof LOGIN;

export const LOGOUT = 'Auth Logout';
export type LOGOUT_TYPE = typeof LOGOUT;

export const LOAD_USERS = 'Auth Load Users';
export type LOAD_USERS_TYPE = typeof LOAD_USERS;

export const ADD_USERS = 'Auth Add Users';
export type ADD_USERS_TYPE = typeof ADD_USERS;

export const ADD_POSTS = 'Auth Add Posts';
export type ADD_POSTS_TYPE = typeof ADD_POSTS;

export interface LOGIN_ACTION {
  type: LOGIN_TYPE;
  payload: {
    name: string;
    remember: boolean;
  };
}

export interface LOGOUT_ACTION {
  type: LOGOUT_TYPE;
}

export interface LOAD_USERS_ACTION {
  type: LOAD_USERS_TYPE;
  payload: any;
}

export interface ADD_USERS_ACTION {
  type: ADD_USERS_TYPE;
  payload: any;
}

export interface ADD_POSTS_ACTION {
  type: ADD_POSTS_TYPE;
  payload: any;
}

export type AuthActions = LOGIN_ACTION | LOGOUT_ACTION | LOAD_USERS_ACTION | ADD_USERS_ACTION | ADD_POSTS_ACTION;
