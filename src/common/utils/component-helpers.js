'use strict';

export const mergeClasses = (first, other) => {
    return `${first}${!!other ? ` ${other}` : ''}`;
};


export const isValidIP =(ip) => {
    console.log("IP:"+ ip);
    if(ip==null || ip=="") return false;
    let arrIp = ip.split(".");
    if (arrIp.length !== 4) return false;
    let re = /\d{1,3}/;
    for (let oct of arrIp) {
        if (oct.match(re) === null) return false;
        if (Number(oct) < 0 || Number(oct) > 255)
            return false;
    }
    return true;
}
export const isValidCSphone =(phone,accountno) => {
    console.log("phone and accountno:"+ phone,accountno);
    if(phone && accountno)
    {
        phone=phone.replace('_', '').replace('+', '').replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
        //if(phone=="" && accountno=="") return 2;
        if(phone=="" && accountno!="") return -1;
        if(phone.length > 1  && phone.length!=11) return 0;
        if(accountno=="" || accountno.length != 4) return 0;
        return 1;
    }
    else if(phone=="" && accountno== "") {
        return 1;
    }
    return 0;
}
export const isValidCSIP =(ip,port,key,dnis) => {
    console.log("csip:"+ ip , port , key, dnis);

    if(ip==null || ip=="") return false;
    let arrIp = ip.split(".");
    if (arrIp.length !== 4) return false;
    let re = /\d{1,3}/;
    for (let oct of arrIp) {
        if (oct.match(re) === null) return false;
        if (Number(oct) < 0 || Number(oct) > 255)
            return false;
    }

    if(port==null || port=="") return false;
    if (Number(port) < 1 &&  Number(port) > 65535)
        return false;
    if(key==null || key=="" || key.length !== 32) return false;
    if(dnis==null || dnis=="" || dnis.length !== 10) return false;
    return true;
}


export const isValidPort = (port) => {
    if(port==null || port=="") return false;
    if (Number(port) < 1 &&  Number(port) > 65535)
        return false;
    return true
}


export function wait(timeInMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeInMilliseconds);
    });
}

export function TanslateIPToHex(ip){
    var IPArr=ip.split('.');
    if(IPArr.length===4)
    {
        let ipaddress="00000000";
        let ipPart1=IntToHex(Number(IPArr[0]).toString(16));
        let ipPart2=IntToHex(Number(IPArr[1]).toString(16));
        let ipPart3=IntToHex(Number(IPArr[2]).toString(16));
        let ipPart4=IntToHex(Number(IPArr[3]).toString(16));
        ipaddress=ipPart1+ipPart2+ipPart3+ipPart4
        console.log(ipaddress);
        return ipaddress;
    }
    return "00000000"
}

function IntToHex(user_str)
{
    if (typeof user_str === 'undefined') 
        return "00";
    let pad="00";
    return  (pad + user_str).slice(-pad.length);

}

export function getRadioString(configStatus) {
    let status = "Unknown";    

    switch (configStatus) {
        case "0":
            status = "Device Running Properly...";
            break;
        case "1":
            status = "Full Download Pending...";
            break;
        case "10":
        case "11":
            status = "Changes Download Pending...";
            break;
        case "20":
            status = "Data Upload Pending...";
            break;
        case "21":
            status = "ID Upload Pending...";
            break;
        case "22":
            status = "Waiting for initial ID Upload...";
            break;
        case "30":
            status = "Waiting for initial checkin...";
            break;
        case "99":
            status = "Blocked";
            break;
        default:
            status = "Unknown";
            break;
    }
    return status;
}

export async  function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, milliseconds);
    });
}

export function isHexadecimal(str) {
    let regexp = /^[0-9a-fA-F]+$/;

    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

export function isNumaric(value) {
    let regexp = /^[0-9]*$/;

    if (regexp.test(value)) {
        return true;
    }
    else {
        return false;
    }
}