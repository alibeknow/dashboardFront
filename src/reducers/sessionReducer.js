import * as actionTypes from 'actions';

const initialState = {
  loggedIn: true,
  auth: {
    username: null,
    password: null
  },
  user: {
    username: '',
    password: '',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Developer',
    role: 'ADMIN' // ['GUEST', 'USER', 'ADMIN']
  }
};

const sessionReducer = (state = initialState, action) => {
  console.log(state);

  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState
      }
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
