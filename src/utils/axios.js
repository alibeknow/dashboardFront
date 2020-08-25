import axios from 'axios';

const instance = axios.create();

const apiURL = 'http://10.20.35.85:3000/providers/';

export const getProviders = ( username, password ) => {
  axios.get(apiURL, {
    auth: {
      username: username,
      password: password
    }}).then(function(response) {
    console.log('Authenticated');
    }).catch(function(error) {
    console.log('Error')
  });
};

export default instance;
