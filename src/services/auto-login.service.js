'use strict';

import httpService from '../common/http.service';
import configureStore from '../redux/configureStore';
import { setUserInfo, setRadioID } from '../redux/actions';

export default (encryptedUserInfo, encrype) => {
    console.log(encryptedUserInfo);

    const body = `grant_type=password&username=${encryptedUserInfo}:${encryptedUserInfo}&password=encrypted`;

    const headers = {
        Accept: 'application/json'
    };

    return httpService.post('Token', body, headers)
        .then(res => {
            //console.log(res);
            configureStore.dispatch(setUserInfo(res));
            configureStore.dispatch(setRadioID(res.radioSerialNo));
        });
};
