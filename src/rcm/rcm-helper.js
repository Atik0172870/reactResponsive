'use scrict';
import { customAlert } from '../common/components/controls';
//import { checkout, checkoutSync, heartbeat, getRCMCommand, getRCMbackupZWaveCommand, getRCMrestoreZWaveCommand, saveDeviceBackup, getIsAnyRFIDNeedToLearn, WirelessAllDeviceLearn, GetA4Command, GetA5Command, GetRCMcmd, GetWifiCommand } from '../services/rcm.service';
//import {
//    setConnecting, setDisconnected, setMessage, setErrorMessage, setDebugRawResponse, isCheckOutRequestPending, isAsyncCheckOutRequest,
//    isRunning, getLastCommand, getFullDownload, setAbort, setDebugStatus, setCmdDone, setWifiSignalStrengthCommand
//} from './rcm-state';

import strings from '../common/strings';

import panelCommand from './panel-command';
import React, { Component } from 'react';
import { string } from 'postcss-selector-parser';


let response = {};
let cmd23Count = 0;
let cmd94Count = 0;
let cmdA4Count = 0;
let cmdA5Count = 0;
let pageName = 'DeviceBackup';
let NextCommand = '';
let NextIndex = '0';

let LearningProgressMessage = '';
let LearningProgressMessageCounter = -1;

let RetryCounter = 0;



function wait(timeInMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeInMilliseconds);
    });
}

let processingChecOutRequest = false;

async function sendCheckOutRequest() {

    if (isRunning() && !processingChecOutRequest) {
        try {
            processingChecOutRequest = true;
            const response = await checkout();
            //console.log(response);
            if (response.ResponseDebugMessage == 'Disconnected.') {
                setMessage(null);
                //setAbort(true);
                //console.log(response);
                return;
            }
        }
        finally {
            setDisconnected();
            processingChecOutRequest = false;
            //console.log(processingChecOutRequest);
        }
    }
}

async function sendCheckOutRequestOnError() {

    if (isRunning() && !processingChecOutRequest) {
        try {
            processingChecOutRequest = true;
            const response = await checkout();
            //console.log(response);
            if (response.ResponseDebugMessage == 'Disconnected.') {
               // setMessage(null);
                //setAbort(true);
                //console.log(response);
                return;
            }
        }
        finally {
            setDisconnected();
            processingChecOutRequest = false;
            //console.log(processingChecOutRequest);
        }
    }
}


export const sendCheckOutRequestSynchronously = () => {
    isRunning() && checkoutSync();
}

async function sendHeartbeatRequest(queryParams) {

    return await heartbeat(queryParams);
}

export async function sendRCMCommand(command, inputList = '', fullDownload = 1) {
    try {
        console.log(command);
        setConnecting(command, fullDownload);
        const { InitialConnectWithServer, RawResponse, RawRequest, ResponseErrorMessage, ResponseStatus, ResponseDebugMessage, IsDebug } = await getRCMCommand(command, { inputList, fullDownload });
        const queryParamsHB = {
            pageName: 'pnl'
        };
        setDebugStatus(IsDebug);

        if (ResponseStatus !== '0' && ResponseStatus !== '21') {
            setErrorMessage(ResponseErrorMessage);
            setDisconnected();
            return;
        }
        if (RawRequest) {
            setDebugRawResponse("Request: " + RawRequest);
            console.log("Request: " + RawRequest);
        }
        if (RawResponse) {
            setDebugRawResponse(RawResponse);
        }

        if (ResponseDebugMessage == 'Disconnected.') {
            setMessage(null);
            return;
        }

        if (InitialConnectWithServer == "1" && !isCheckOutRequestPending()) {
            let response = await sendHeartbeatRequest(queryParamsHB);
            //console.log(response);
            if (response.ResponseDebugMessage == 'Disconnected.') {
                setMessage(null);
                return;
            }
            if (response.ResponseStatus !== '0') {
                var d = new Date();
                var n = d.toString();

                console.log(n, response, 'RetryCounter:', RetryCounter)
                if ((response.ResponseStatus === '24' || response.ResponseStatus === '21') && response.ResponseBridgedWithRCM == '0' && RetryCounter < 4) {

                    if (response.ResponseStatus === '21') {
                        setDisconnected();
                    }
                    await wait(10000);
                    console.log("Send From Retry");
                    sendRCMCommand(command, inputList, fullDownload);
                    RetryCounter++;
                    return;
                }
                else {
                    RetryCounter = 0;
                    setErrorMessage(response.ResponseErrorMessage);
                    setDisconnected();
                    return;
                }
            }
            setMessage(response.ResponseMessage);
            setDebugRawResponse(response.RawResponse);
            while (response.ResponseCmdType === "26" && !isCheckOutRequestPending()) {
                await wait(250);
                response = await sendHeartbeatRequest(queryParamsHB);
                console.log("*************************");
                console.log(response);
                console.log("*************************");
                if (response.ResponseDebugMessage == 'Disconnected.') {
                    setMessage(null);
                    return;
                }
                if (response.ResponseStatus !== '0') {
                    console.log(response);
                    console.log('RetryCounter:', RetryCounter);

                    //if (response.ResponseStatus === '24' && response.ResponseBridgedWithRCM === '0' && RetryCounter < 4) {
                    if ((response.ResponseStatus === '24' || response.ResponseStatus === '21') && response.ResponseBridgedWithRCM == '0' && RetryCounter < 4) {

                        if (response.ResponseStatus === '21') {
                            setDisconnected();
                        }
                        RetryCounter++;
                        await wait(10000);
                        sendRCMCommand(command, inputList, fullDownload);
                        return;
                    }
                    else {
                        RetryCounter = 0;
                        setErrorMessage(response.ResponseErrorMessage);
                        sendCheckOutRequest();
                    }
                }
                if (response.ResponseCmdType === 'ER') {
                    setErrorMessage(response.ResponseErrorMessage);
                    //sendCheckOutRequest();
                    sendCheckOutRequestOnError();
                   
                }
                else {
                    console.log("last CMD2: " + response.ResponseMessage);
                    if (!!response.ResponseMessage && response.ResponseMessage.toLowerCase().includes('operation completed')) {
                        var cmd = `${getLastCommand()}`;     
                        console.log("last CMD: " + cmd);
                        setMessage(null);
                        if (cmd === 'FireLink_Download_All') {
                            if (response.errorWarningList) {
                                let errorList = response.errorWarningList.ErrorList;
                                let warningList = response.errorWarningList.WarningList;
                                let output = '';

                                for (let i = 0; i < errorList.length; i++) {
                                    let error = errorList[i];
                                    output = output + "<li class='list-group-item list-group-item-danger'>" + error + "</li>"
                                }

                                for (let i = 0; i < warningList.length; i++) {
                                    let warning = warningList[i];
                                    output = output + "<li class='list-group-item list-group-item-warning'>" + warning + "</li>"
                                }

                                if (output != "") {
                                    let headerText = response.errorWarningList.Summary ? "<h4 style='color:red;'>" + response.errorWarningList.Summary + "</h4>" : "<h4>FireLink Error(s)and Warning(s)</h4>";
                                    output = "<ul class='list-group' style='font-size:12px;'>" + output + "</ul>";
                                    customAlert(output, headerText, true);
                                }
                            }
                            else {
                                setMessage(strings.downloadCompletedSuccessfully);
                        
                            }
                            setDisconnected();
                            return;
                        }
                        //setErrorMessage(`${strings.operationCompleted} ${getLastCommand()}.`);
                    } else {
                        var cmd = `${getLastCommand()}`;

                        console.log("Test " + cmd);
                        setMessage(response.ResponseMessage);
                    }
                }
                setDebugRawResponse(response.RawResponse);
            }
            await sendCheckOutRequest();

        }
        else if (isCheckOutRequestPending()) {
            await sendCheckOutRequest();
            setMessage(null);
        }
        else {
            setDisconnected();
            //console.log("setDisconnected();")
        }
    } catch (e) {
        setErrorMessage(e.message);
        setDisconnected();
    }

}

export async function sendRCMbackupZWaveCommand(command, fullDownload = 0) {
    try {
        cmd23Count = 0;
        cmd94Count = 0;

        const queryParamsHB = {
            pageName: 'DeviceBackup'
        };
        pageName = 'DeviceBackup';
        setConnecting(command, fullDownload);

        //*********** Call CMD 23  **********///      
        //  await sendbackupCMD('23', '', '','');
        await sendbackupCMD('23', pageName, '', '');
        while (response.ResponseBridgedWithRCM !== "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            await wait(250);
            await sendbackupCMD("26", pageName, response.ResponseACKIndex, response.SourceID);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
        }

        setDebugStatus(response.IsDebug);

        if (response.ResponseStatus !== '0') {
            setErrorMessage(response.ResponseErrorMessage);
            setDisconnected();
            return;
        }
        if (response.RawRequest) {
            //setDebugRawResponse("Request: " + RawRequest);            
            console.log("Request: " + response.RawRequest);
        }
        if (response.RawResponse) {
            setDebugRawResponse(response.RawResponse);
        }

        //if (response.ResponseDebugMessage == 'Disconnected.') {
        //    setMessage(null);
        //    return;
        //}

        if (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            console.log(pageName);
            //**************Call CMD 94  *************  ///
            await sendbackupCMD('94', pageName, '00', response.SourceID);
            // await sendbackupCMD('C0', pageName, '00', response.SourceID);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }

            while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != '00') {
                await wait(250);

                await sendbackupCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                if (response.ResponseMessage) {
                    setMessage(response.ResponseMessage);
                }
            }

            if (response.ResponseCmdType == '00' && response.ResponseStatus == '0') {
                await sendbackupCMD('25', pageName, '', '');
                setMessage('Device Backup is done');
                await wait(2000);
                setMessage('Saving Device Backup');
                await saveDeviceBackup();
            }

            //console.log(response);
            //if (response.ResponseDebugMessage == 'Disconnected.') {
            //    setMessage(null);
            //    return;
            //}
            if (response.ResponseStatus !== '0') {
                setErrorMessage(response.ResponseErrorMessage);
                setDisconnected();
                return;
            }
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
            setDebugRawResponse(response.RawResponse);
            await sendCheckOutRequest();
        }
        else if (isCheckOutRequestPending()) {
            await sendCheckOutRequest();
            //setMessage(null);
        }
        else {
            setDisconnected();
            //console.log("setDisconnected();")
        }
    } catch (e) {
        setErrorMessage(e.message);
        setDisconnected();
    }

}

export async function sendRCMrestoreZWaveCommand(command, fullDownload = 0) {
    try {
        cmd23Count = 0;

        const queryParamsHB = {
            pageName: ''
        };
        pageName = 'DeviceRestore';
        setConnecting(command, fullDownload);

        //*********** Call CMD 23  **********///      
        await sendRestoreCMD('23', pageName, '', '');
        //while (response.InitialConnectWithServer !== "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
        //    await wait(1000);
        //    await sendRestoreCMD('23', pageName, response.ResponseACKIndex, response.SourceID);
        //    if (response.ResponseMessage) {
        //        setMessage(response.ResponseMessage);
        //    }
        //}
        while (response.ResponseBridgedWithRCM !== "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            await wait(250);
            await sendRestoreCMD('26', pageName, response.ResponseACKIndex, response.SourceID);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
        }
        setDebugStatus(response.IsDebug);

        if (response.ResponseStatus !== '0') {
            setErrorMessage(response.ResponseErrorMessage);
            setDisconnected();
            return;
        }
        if (response.RawRequest) {
            //setDebugRawResponse("Request: " + RawRequest);            
            console.log("Request: " + response.RawRequest);
        }
        if (response.RawResponse) {
            setDebugRawResponse(response.RawResponse);
        }

        //if (response.ResponseDebugMessage == 'Disconnected.') {
        //    setMessage(null);
        //    return;
        //}

        if (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            //**************Call CMD A5  *************  ///
            /*  await sendRestoreCMD('A5', pageName, '', response.SourceID);
              while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != 'A5') {
                  await wait(250);
                  await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                  setMessage(response.ResponseMessage);
              }
              
              if (response.ResponseCmdType == 'A5' && response.ResponseStatus == '0') {
                  await sendRestoreCMD('8A', pageName, '', response.SourceID);
  
                  while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != 'D0') {
                      await wait(250);
                      await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                      setMessage(response.ResponseMessage);
                  }
  
              }
             
  
              if (response.ResponseCmdType == 'D0' && response.ResponseStatus == '0') {
                  await sendRestoreCMD('95', pageName, '', response.SourceID);
  
                  while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != '95') {
                      await wait(250);
                      await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                      setMessage(response.ResponseMessage);
                  }
  
              } */

            await sendRestoreCMD('95', pageName, '', response.SourceID);

            while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != '95') {
                await wait(250);
                await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                if (response.ResponseMessage) {
                    setMessage(response.ResponseMessage);
                }
            }

            if (response.ResponseCmdType == '95' && response.ResponseStatus == '0') {
                await sendRestoreCMD('DE', pageName, '0000013C', response.SourceID);
                // await sendRestoreCMD('C1', pageName, '01', response.SourceID);

                while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != '00') {

                    await wait(250);
                    //await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                    console.log('NextCommand:' + response.NextCommand);
                    console.log('NextIndex:' + response.NextIndex);
                    if (response.NextCommand != null && response.NextCommand != '') {
                        NextCommand = response.NextCommand;
                        NextIndex = response.NextIndex;
                    }
                    if (response.ResponseCmdType == 'NC') {
                        await sendRestoreCMD(NextCommand, pageName, NextIndex, response.SourceID);
                    }
                    else {
                        await sendRestoreCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                    }
                    if (response.ResponseMessage) {
                        setMessage(response.ResponseMessage);
                    }
                }

                if (response.ResponseCmdType == '00') {
                    setMessage(response.ResponseMessage);
                    setCmdDone(true);
                }

            }



            //console.log(response);
            //if (response.ResponseDebugMessage == 'Disconnected.') {
            //    setMessage(null);
            //    return;
            //}
            if (response.ResponseStatus !== '0') {
                setErrorMessage(response.ResponseErrorMessage);
                setDisconnected();
                return;
            }
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
            setDebugRawResponse(response.RawResponse);
            await sendbackupCMD('25', pageName, '', '');
            //await sendCheckOutRequest();

        }
        else if (isCheckOutRequestPending()) {
            await sendCheckOutRequest();
            //setMessage(null);
        }
        else {
            setDisconnected();
            //console.log("setDisconnected();")
        }
    } catch (e) {
        setErrorMessage(e.message);
        setDisconnected();
    }

}

async function sendbackupCMD(cmdName, pageName, param, sourceID) {
    if (cmdName == '23') {
        cmd23Count += 1;
    }

    const queryParmas = {
        command: cmdName,
        pagename: pageName,
        params: param,
        sourceID: sourceID
    };
    response = await getRCMbackupZWaveCommand(queryParmas);
    console.log('*************** Backup response**********************');
    console.log(response);
}

async function sendRestoreCMD(cmdName, pageName, param, sourceID) {
    if (cmdName == '23') {
        cmd23Count += 1;
    }

    const queryParmas = {
        command: cmdName,
        pagename: pageName,
        params: param,
        sourceID: sourceID
    };
    response = await getRCMrestoreZWaveCommand(queryParmas);
    console.log('*****************  Restore response********************');
    console.log(response);
}

export async function sendSubscriberAccountSetupCommand(command, EndUseZwaveSettingFlag, ComplexAlertFlag, MACAddress) {
    try {
        cmd23Count = 0;
        cmdA4Count = 0;
        cmdA5Count = 0;
        pageName = '';
        setConnecting(command, '');

        //*********** Call CMD 23  **********///      
        //  await sendbackupCMD('23', '', '','');
        await sendCMD('23', pageName, '', '');
        while (response.ResponseBridgedWithRCM !== "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            await wait(250);
            await sendCMD("26", pageName, response.ResponseACKIndex, response.SourceID);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
        }

        setDebugStatus(response.IsDebug);

        if (response.ResponseStatus !== '0') {
            setErrorMessage(response.ResponseErrorMessage);
            setDisconnected();
            return;
        }
        if (response.RawRequest) {
            //setDebugRawResponse("Request: " + RawRequest);            
            console.log("Request: " + response.RawRequest);
        }
        if (response.RawResponse) {
            setDebugRawResponse(response.RawResponse);
        }

        //if (response.ResponseDebugMessage == 'Disconnected.') {
        //    setMessage(null);
        //    return;
        //}

        if (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            console.log(pageName);
            setMessage("Device connected");
            //**************Call CMD A4  *************  ///
            //await sendCMD('A4Command', pageName, '00', response.SourceID);            
            const queryParmas = {
                MACAddress: MACAddress,
                isNotficationEnabled: ComplexAlertFlag,
                isZwaveProgramFlagEnabled: EndUseZwaveSettingFlag,
                SourceID: response.SourceID
            };
            setMessage("Executing command...");
            response = await GetA4Command(queryParmas);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }

            while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != 'A5') {
                await wait(250);

                await sendCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                if (response.ResponseMessage) {
                    setMessage(response.ResponseMessage);
                }
            }
            if (response.ResponseCmdType == "A5") {
                const queryParmas = {
                    SourceID: response.SourceID
                };
                setMessage("Executing command...");
                response = await GetA5Command(queryParmas);
                if (response.ResponseMessage) {
                    setMessage(response.ResponseMessage);
                }
                while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != '00') {
                    await wait(250);

                    await sendCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
                    if (response.ResponseMessage) {
                        setMessage(response.ResponseMessage);
                    }
                }
            }
            if (response.ResponseCmdType === '00') {
                setMessage("Successfully executed");
                await wait(250);
                setDisconnected();
                setMessage(null);
                return response;
            }

            if (response.ResponseStatus !== '0') {
                setErrorMessage(response.ResponseErrorMessage);
                setDisconnected();
                return;
            }
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
            setDebugRawResponse(response.RawResponse);
            await sendCheckOutRequest();
        }
        else if (isCheckOutRequestPending()) {
            await sendCheckOutRequest();
            //setMessage(null);
        }
        else {
            setDisconnected();
            //console.log("setDisconnected();")
        }
    } catch (e) {
        setErrorMessage(e.message);
        setDisconnected();
    }

}

export async function sendGetWIFISignalStrengthCommand(command) {



    try {
        cmd23Count = 0;
        cmdA4Count = 0;
        cmdA5Count = 0;
        pageName = '';
        setConnecting(command, '');

        //*********** Call CMD 23  **********///      

        await sendCMD('23', pageName, '', '');
        while (response.ResponseBridgedWithRCM !== "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            await wait(250);
            await sendCMD("26", pageName, response.ResponseACKIndex, response.SourceID);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }
        }

        setDebugStatus(response.IsDebug);

        if (response.ResponseStatus !== '0') {
            setErrorMessage(response.ResponseErrorMessage);
            setDisconnected();
            return;
        }
        if (response.RawRequest) {
            console.log("Request: " + response.RawRequest);
        }
        if (response.RawResponse) {
            setDebugRawResponse(response.RawResponse);
        }

        if (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0') {
            console.log(pageName);
            setMessage("Device connected");
            //**************Call CMD A4  *************  ///
            //await sendCMD('A4Command', pageName, '00', response.SourceID);            
            const queryParmas = {
                SourceID: response.SourceID
            };
            setMessage("Fetching Wifi Signal Strength.");
            response = await GetWifiCommand(queryParmas);
            if (response.ResponseMessage) {
                setMessage(response.ResponseMessage);
            }

            while (response.ResponseBridgedWithRCM == "1" && !isCheckOutRequestPending() && response.ResponseStatus == '0' && response.ResponseCmdType != 'AB') {
                await wait(250);

                await sendCMD(response.ResponseCmdType, pageName, response.ResponseACKIndex, response.SourceID);
            }
            if (response.ResponseStatus !== '0') {
                setErrorMessage(response.ResponseErrorMessage);
                setDisconnected();
                return;
            }
            if (response.ResponseCmdType == "AB" && response.ResponseMessage != "") {

                var Strength = parseInt(response.ResponseMessage, 16);
                //setWifiSignalStrengthCommand(response.ResponseMessage);
                setWifiSignalStrengthCommand(Strength);
                setDisconnected();
                setMessage(null);
            }
            setDebugRawResponse(response.RawResponse);
            await sendCheckOutRequest();
        }
        else if (isCheckOutRequestPending()) {
            await sendCheckOutRequest();
            //setMessage(null);
        }
        else {
            setDisconnected();
            //console.log("setDisconnected();")
        }
    } catch (e) {
        setErrorMessage(e.message);
        setDisconnected();
    }

}

async function sendCMD(cmdName, pageName, param, sourceID) {
    if (cmdName == '23') {
        cmd23Count += 1;
    }

    const queryParmas = {
        command: cmdName,
        pagename: pageName,
        params: param,
        sourceID: sourceID
    };
    response = await GetRCMcmd(queryParmas);
    console.log('*************** response**********************');
    console.log(response);
}