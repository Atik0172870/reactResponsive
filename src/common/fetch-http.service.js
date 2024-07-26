'use strict';

export function get(url, headers) {
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then(handleErrors)
        .then(getResponse);
}

export function post(url, body, headers) {
    return fetch(url, {
        method: "POST",
        body: getBody(headers, body),
        headers: headers
    }).then(handleErrors)
        .then(getResponse);
}

export function remove(url, body, headers) {
    return fetch(url, {
        method: "DELETE",
        body: getBody(headers, body),
        headers: headers
    }).then(handleErrors)
        .then(getResponse);
}

function getBody(headers, body) {
    if (headers['Content-Type'] === 'application/json' && typeof body === 'object') {
        return JSON.stringify(body);
    }
    else {
        return body;
    }
}

function getResponse(res) {
    switch (res.headers.get('Content-Type')) {
        case 'application/json;charset=UTF-8':
        case 'application/json':
            return res.json();
        default:
            return res.text();
    }
}

function handleErrors(response) {
    if (!response.ok) {
        if (response.headers.get('Content-Type') === 'application/json;charset=UTF-8') {
            return response.json().then(e => {
                throw Error(e.error_description || response.statusText);
            });
        }
        else {
            throw Error(response.statusText);
        }
    }
    else {
        return response;
    }
}