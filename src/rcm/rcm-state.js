import configureStore from '../redux/configureStore';
import { setRunning, setLastCommand, setLastFullDownload, setResponseMessage, setResponseErrorMessage, setRawResponse, setCheckOutRequestPending, setIsAbort, setIsDebug, setIsCmdDone, setWiFiSignalStrength } from '../redux/actions';
import strings from '../common/strings';


export function setConnecting(command, fullDownload) {
    configureStore.dispatch(setRunning(true));
    configureStore.dispatch(setLastCommand(command));
    configureStore.dispatch(setLastFullDownload(fullDownload));
    setMessage(strings.tryingToConnect);
}

export function setDisconnected() {
    //configureStore.dispatch(setResponseMessage(strings.disconnected));
    configureStore.dispatch(setRunning(false));
    configureStore.dispatch(setCheckOutRequestPending(false));
}

export function setMessage(message) {
    configureStore.dispatch(setResponseErrorMessage(null));
    configureStore.dispatch(setResponseMessage(message));
}

export function setErrorMessage(message) {
    configureStore.dispatch(setResponseMessage(null));
    configureStore.dispatch(setResponseErrorMessage(message));
}

export function setDebugRawResponse(message) {
    configureStore.dispatch(setRawResponse(message));
}

export function setDebugStatus(debug) {
    configureStore.dispatch(setIsDebug(debug));
}

export function isRunning() {
    return configureStore.getState().rcm.running;
}

export function getLastCommand() {
    return configureStore.getState().rcm.lastCommand;
}

export function getFullDownload() {
    return configureStore.getState().rcm.fullDownload;
}

export function isCheckOutRequestPending() {
    return configureStore.getState().rcm.checkOutRequesPending;
}

export function setAbort(abort) {    
    configureStore.dispatch(setIsAbort(abort));
}

export function setCmdDone(isCMDDone) {
    configureStore.dispatch(setIsCmdDone(isCMDDone));
}

export function setWifiSignalStrengthCommand(WiFiSignalStrength) {
    configureStore.dispatch(setWiFiSignalStrength(WiFiSignalStrength));
}

