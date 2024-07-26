import { SET_USER_LIST } from '../actions/action-types';

export default (state = [], { type, userList }) => {
    switch (type) {
        case SET_USER_LIST:
            return { ...userList };
        default:
            return state;
    }
};