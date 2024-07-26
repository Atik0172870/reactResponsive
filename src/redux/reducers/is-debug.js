import { SET_IS_DEBUG } from '../actions/action-types';

export default (state = false, { type, isDebug}) => {
    switch (type) {
        case SET_IS_DEBUG:            
            return isDebug;
        default:
            return state;
    }
};
