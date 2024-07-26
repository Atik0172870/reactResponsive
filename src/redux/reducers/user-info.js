import { SET_USER_INFO, DELETE_USER_INFO } from '../actions/action-types';

export default (state = {}, {type, userInfo}) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...userInfo };
    case DELETE_USER_INFO:
      return {};
    default:
      return state;
  }
};
