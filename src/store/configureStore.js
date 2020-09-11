import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { logger } from 'redux-logger';
// import { createLogger } from 'redux-logger';

// const loggerMiddleware = createLogger();

/*

const loggingMiddleware = (store) => (next) => (action) => {
  // Our middleware
  console.log(`Redux Log:`, action);
  // call the next function
  next(action);
};

*/

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares, logger)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
