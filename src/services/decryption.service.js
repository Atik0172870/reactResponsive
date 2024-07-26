'use strict';

import configureStore from '../redux/configureStore';

import { get } from './api.service';

export default (queryParams) => {
    return get('/api/Decryption', queryParams);
};
