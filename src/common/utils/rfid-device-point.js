'use strict';

//import { release } from "os";

export default (rfid, devicePoint) => {
    let rfidPrefix = rfid.substr(0, 1);     
    let zoneType = rfid.substr(1, 2);     
    devicePoint = devicePoint.toString();
    console.log(rfidPrefix, rfidPrefix, typeof (devicePoint), zoneType);
    console.log(rfidPrefix==='1');
    switch (rfidPrefix) {
        case '0': case '1': case '2': case '3': case 'C':         
            return (devicePoint === '0' || devicePoint === '1' || devicePoint === '2' || devicePoint === '9') ? true : false;
        case '4':               
            return ((zoneType = 'A' && (devicePoint === '0' || devicePoint === '1' || devicePoint === '2')) || (devicePoint === '0' || devicePoint === '1')) ? true : false;
        case '7' :case '8': case 'E':            
            return   (devicePoint === '0' || devicePoint === '1' || devicePoint === '9') ? true : false;
        default:
            return false;
    }
}
