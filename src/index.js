'use strict';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import './styles/main.scss';

if (!window.Promise) {
    window.Promise = Promise;
}

function renderApp() {
    ReactDOM.render(
        <Root />,
        document.getElementById('root')
    );
}

renderApp();

if (module.hot) {
    module.hot.accept('./app.router', renderApp);
}
