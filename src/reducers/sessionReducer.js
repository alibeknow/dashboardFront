import * as actionTypes from '../actions';

export const initialState = {
  loggedIn: false,
  avatar: null,
  bio: 'Unauthorized',
  role: 'GUEST' // ['GUEST', 'USER', 'ADMIN']
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState,
        loggedIn: true,
        avatar: '/images/avatars/avatar_11.png',
        bio: 'Developer',
        username: action.username,
        password: action.password,
        role: 'ADMIN'
      }
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        avatar: null,
        bio: 'Unauthorized',
        role: 'GUEST'
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
