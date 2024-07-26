import { combineReducers } from 'redux';
import userInfo from './user-info';
import userList from './set-users';


export default combineReducers({
    userInfo,
    userList,    
});
