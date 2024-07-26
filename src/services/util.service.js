'use strict';

import { get, post } from './api.service';

export const GetAppVersion = (queryParams) => {
    return get('/api/Util/GetAppVersion', queryParams);
};