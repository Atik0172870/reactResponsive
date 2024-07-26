'use strict';

import { get, post } from './api.service';

export const createInvitation = (body, queryParams) => {
    return post('/api/invitation/create', body, queryParams);
};
