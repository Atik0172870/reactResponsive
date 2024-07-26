'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import promise from 'redux-promise';

import DevTools from './containers/DevTools';
import rootReducer from './reducers';
import { loadState, saveState } from '../sessionStorage';


//Todo: make it faunction and change call from login service
export default (() => {
  const initialState = loadState();
  const middlewares = [promise];

  const enhancer = compose(
    // Middleware you want to use in development:
    //applyMiddleware(d1, d2, d3),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  );

  //const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares), enhancer);
  const store = createStore(rootReducer, initialState, enhancer);


  store.subscribe(throttle(() => {
      saveState({
          radioid: store.getState().radioid,          
          userInfo: store.getState().userInfo,
    });
  }, 1000));

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
})();