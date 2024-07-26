import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import AppRouter from './app.router';
import DevTools from './redux/containers/DevTools';

//Todo: change it
//const store = configureStore();
//<DevTools />
const store = configureStore;

export default () => (
    <Provider store={store}>
        <div className="devTools-container">
            <AppRouter />  
            <DevTools />
        </div>
    </Provider>
);