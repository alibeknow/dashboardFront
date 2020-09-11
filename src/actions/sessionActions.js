export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const login = ( username, password ) => dispatch =>
  dispatch({
    type: SESSION_LOGIN,
    username: username,
    password: password
  });

export const logout = () => dispatch =>
  dispatch({
    type: SESSION_LOGOUT,
    username: '',
    password: ''
  });
