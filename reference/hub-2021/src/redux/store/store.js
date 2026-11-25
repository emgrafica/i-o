import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux'
import { promiseMiddleware, localStorageMiddleware } from '../middleware/middleware';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';

import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const logger = (store) => (next) => (action) => {
  next(action);
  //console.log("STORE: >>>>: " + JSON.stringify(store));
  //console.log("NEXT: >>>>: " + JSON.stringify(next));
  //console.log("action: >>>>: " + JSON.stringify(action.type));
}

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, sagaMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger(), sagaMiddleware)
  }

};

export const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));
  sagaMiddleware.run(rootSaga);
  return store;
}

