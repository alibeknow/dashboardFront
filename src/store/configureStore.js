import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';


export default function configureStore() {

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

  return store;
}
