'use strict';

import httpService from '../common/http.service';
import configureStore from '../redux/configureStore';
import { setUserInfo } from '../redux/actions';

export default (userName, password) => {
    const body = `grant_type=password&userName=${userName}&password=${password}`;
   
    const headers = {
        Accept: 'application/json'
    };

    return httpService.post('Token', body, headers)
        .then(res => {
            console.log(res);
            configureStore.dispatch(setUserInfo(res));            
        });
};
