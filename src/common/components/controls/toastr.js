'use strict';

import React from 'react';
import { ReactToastr, ToastContainer, ToastMessage, ToastMessageFactory } from 'react-toastr';


import strings from '../../strings';

let toastr;

export const TContainer = ({ container }) => (
    <ToastContainer ref={cont => toastr = cont}
        toastMessageFactory={ToastMessageFactory}
        className="toast-top-right" />
);

export const saveToast = () => successToast(strings.dataSavedSucccessfully);
export const cancelToast = () => successToast(strings.dataCanceledSucccessfully);
export const allUpToDateToast = () => successToast(strings.allUpToDate, null);
export const noDataChangedToast = () => successToast(strings.noDataChanged, null);
export const saveErrorToast = () => errorToast(strings.saveError);
export const removeToast = () => successToast(strings.dataRemovedSuccessfully);
export const removeErrorToast = () => errorToast(strings.removeError);

export const successToast = (message, header = strings.success, timeOut = 3000, closeButton = true) => {
    toastr.success(message, header, {
        timeOut,
        closeButton
    });
};

export const errorToast = (message, header = strings.error, timeOut = 3000, closeButton = true) => {
    toastr.error(message, header, {
        timeOut,
        closeButton
    });
};

