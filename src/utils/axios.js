import axios from 'axios';

const instance = axios.create();

export const apiURL = 'http://10.20.35.85:3000/';

export const getAuth = ( username, password, path ) => {
  return axios.get(apiURL + path,  {
    auth: {
      username: username,
      password: password
    }
  });
};

export const getState = ( path ) => {
  return axios.get( apiURL + path, {
    auth: {
      username: '',
      password: '',
    }
  })
};


export default instance;
