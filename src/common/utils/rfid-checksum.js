'use strict';

export default (rfID) => {
    const arr = Array.from(rfID);
    let calcInt = 0;
    for (let i = 0; i < arr.length; i++) {
        calcInt += parseInt(arr[i], 16);
        calcInt <<= 1;
        const result = calcInt & 0x100;
        if (result > 0)
            calcInt |= 1;
    }

    let checksum = ((calcInt + (calcInt >> 4)) & 0x0F);
    return checksum.toString(16).toUpperCase();
}