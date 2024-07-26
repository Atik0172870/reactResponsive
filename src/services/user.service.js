'use strict';

import { get, post } from './api.service';

export const getAllActiveUser = (queryParams) => {
    return get('/api/user/all', queryParams);
};

export const getActiveUserById = (queryParams) => {
    return get('/api/user/GetUserDetails/'+queryParams, queryParams);
};
export const onSaveUser = (body, queryParams) => {
    return post('/api/user/save', body, queryParams);
};
export const createUser = (body, queryParams) => {
    return post('/api/user/Create', body, queryParams);
};
export const deleteUserById = (queryParams) => {
    return get('/api/user/DeleteUser/'+queryParams, queryParams);
};

