import React from "react";
import axios from 'axios';

const instance = axios.create();

const apiURL = 'http://10.20.35.85:3000/';

export const getAuth = ( username, password, path ) => {
  return axios.get(apiURL + path, {
    auth: {
      username: username,
      password: password
    }
  });
};


export default instance;
