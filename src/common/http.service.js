'use strict';

import { browserHistory } from 'react-router'

//import { post } from './axios-http.service';
import { post, get, remove } from './fetch-http.service';
//import { post } from './superagent-http.service';

export default {
    /**
     * GET relative path with optional data, callback, headers and base address
     * @param {string} path Relative path of the request url
     * @param {*} [data] Request body
     * @param {function(*, Object):void} [callback] Callback function
     * @param {{field:string, value:string}[]} [headers] Reqest headers
     * @param {string} [base] Base url
     */
    get: (path, headers, queryParams, base = API_URL) => {
        //const url = `${base}${path}`;
        const url = getUrl(path, queryParams);
        return get(url, headers).catch(catchHandler);
    },

    /**
     * POST relative path with optional data, callback, headers and base address
     * @param {string} path Relative path of the request url
     * @param {*} [data] Request body
     * @param {function(*, Object):void} [callback] Callback function
     * @param {{field:string, value:string}[]} [headers] Reqest headers
     * @param {string} [base] Base url
     */
    post: (path, body, headers, queryParams, base = API_URL) => {
        //const url = `${base}${path}`;
        const url = getUrl(path, queryParams);
        return post(url, body, headers).catch(catchHandler);;
    },

    /**
     * remove relative path with optional data, callback, headers and base address
     * @param {string} path Relative path of the request url
     * @param {*} [data] Request body
     * @param {function(*, Object):void} [callback] Callback function
     * @param {{field:string, value:string}[]} [headers] Reqest headers
     * @param {string} [base] Base url
     */
    remove: (path, body, headers, queryParams, base = API_URL) => {
        //const url = `${base}${path}`;
        const url = getUrl(path, queryParams);
        return remove(url, body, headers).catch(catchHandler);;
    }
}

const catchHandler = e => {
    if (e.message === 'Unauthorized' || e.message === 'Gateway Timeout') {
        browserHistory.push('/login');
    }
    throw e;
}

const getUrl = (path, queryParams) => {


    const params = getQueryParmas(queryParams);
    if (params) {
        return `${path}?${params}`;
    } else {
        return path;
    }
};

const getQueryParmas = (queryParams) => {
    if (queryParams) {
        var esc = encodeURIComponent;
        return Object.keys(queryParams)
            .map(k => esc(k) + '=' + esc(queryParams[k]))
            .join('&');
    } else {
        return false;
    }
};
