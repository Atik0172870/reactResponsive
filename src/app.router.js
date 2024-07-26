'use strict';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Master } from './components';
import Login from './containers/Login';
import Home from './containers/Home';
import { isDebug } from './common/is-debug';
import { login, logout, home } from './route-path';
import configureStore from './redux/configureStore';
import { deleteUserInfo, } from './redux/actions';


function requireAuth(nextState, replace) {
    if (!configureStore.getState().userInfo.access_token) {
        const search = window.location.search;
        let state;
        if (search) {
            const params = search.substr(4);
            if (params) {
                state = params;
            }
        }
        replace({
            pathname: login,
            state
        });
    }
}

function deauthenticateUser(nextState, replace) {      
    var path = login;    
    configureStore.dispatch(deleteUserInfo());
    replace({
        pathname: path
    })
}


function isDebugEnable(nextState, replace) {
    let pathName = '';
    if (isDebug !== true) {
        pathName = '/'
        replace({
            pathname: pathName
        })
    }


}

function isEndUser(nextState, replace) {
    var user = configureStore.getState().userInfo;
    //console.log(user);    
    var pathName = '';
    if (user && user.role !== 'EndUser') {
        pathName = '/'
        replace({
            pathname: pathName
        })
    }

}

function isDealerAdmin(nextState, replace) {
    var user = configureStore.getState().userInfo;
    // console.log(user);    
    var pathName = '';
    if (user && user.role !== 'DealerAdmin') {
        pathName = '/'
        replace({
            pathname: pathName
        })
    }

}

export default function () {
    return (
        <Router history={browserHistory}>
            <Route path={login} component={Login} />    
            <Route path={home} component={Home} />
            <Route path={logout} onEnter={deauthenticateUser} />
            {/* <Route component={Master} onEnter={requireAuth}>
                <Route path={home} component={Home} />
            </Route> */}
        </Router>
    );
}
