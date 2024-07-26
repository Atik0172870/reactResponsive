'use strict';

import httpService from '../common/http.service';
import configureStore from '../redux/configureStore';

export const get = (path, queryParams) => {
    const access_token = configureStore.getState().userInfo.access_token;
    const headers = {
        Accept: 'application / json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
    };
    return httpService.get(path, headers, queryParams).then(JSON.parse);
};

export const post = (path, body, queryParams) => {
    const access_token = configureStore.getState().userInfo.access_token;
    const headers = {
        Accept: 'application / json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
    };
    return httpService.post(path, body, headers, queryParams).then(JSON.parse);
};

export const remove = (path, body, queryParams) => {
    const access_token = configureStore.getState().userInfo.access_token;
    const headers = {
        Accept: 'application / json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
    };
    return httpService.remove(path, body, headers, queryParams).then(JSON.parse);
};

