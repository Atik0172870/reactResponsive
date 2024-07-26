import * as actions from './action-types';

export const setUserInfo = (userInfo) => ({
    type: actions.SET_USER_INFO,
    userInfo
});

export const deleteUserInfo = () => ({
    type: actions.DELETE_USER_INFO
});

export const setUserList = (userList) => ({
    type: actions.SET_USER_LIST,
    userList
});




