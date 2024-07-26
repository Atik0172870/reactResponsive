export default {
    format,
    formatDateString
};

function format(date, format) {
    if (format === 'MM/DD/YY') {
        var year = date.getFullYear().toString().substr(2);
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    else if (format === 'HH.mm.ss') {
        var hours = date.getHours().toString();
        var minutes = date.getMinutess().toString();
        var seconds = date.getSeconds().toString();
        return `${hours}.${minutes}.${seconds}`;
    }
    else {
        throw new Error('Not Implemented');
    }
};

function formatDateString(dateString, format) {
    const date = new Date(dateString);

    if (format === 'MM/DD/YY') {
        var year = date.getFullYear().toString().substr(2);
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    else if (format === 'MM/DD/YYYY Hrs') {
        var year = date.getFullYear().toString();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2,'0');
        return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + 'Hrs.';
    }
    else if (format === 'HH.mm.ss') {
        var hours = date.getHours().toString();
        var minutes = date.getMinutess().toString();
        var seconds = date.getSeconds().toString();
        return `${hours}.${minutes}.${seconds}`;
    }
    else {
        throw new Error('Not Implemented');
    }
};