// import config from 'config';
// import { authHeader } from './authHeader';

export const userService = {
  login,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`http://10.20.35.85:3000/providers`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user) {
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
