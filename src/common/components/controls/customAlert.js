'use strict';

import swal from 'sweetalert';


export const customConfirm = (text, confirmCallback, cancelCallback, title = 'Are you sure?', confirmButtonText = 'Yes', cancelButtonText = 'No', isHtml = false, confirmButtonColor = '#99ff99' ) => {
    swal({
        title: title,
        text: text,
        //type: "warning",
        html: isHtml,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm && confirmCallback) {
                confirmCallback();
            } else if (cancelCallback) {
                cancelCallback();
            }
        });
};

export const customAlert = (text, header, isHtml = false) => {
    if (header) {
        swal({
            title: header,
            text: text,
            html: isHtml
            });
    }
    else {
        swal(text);
    }
};