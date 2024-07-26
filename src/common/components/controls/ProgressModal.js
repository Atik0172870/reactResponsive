'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
//import Progress from 'react-progressbar';
import configureStore from '../../../redux/configureStore';
//import { setCheckOutRequestPending, setResponseErrorMessage, setResponseMessage, setRunning, setIsAbort, setIsDealerEnteredProgramming, setIsWifiSeraching, set_ZwaveRestoreBacup, setIsFirmwareDownloading, setFirmwareStatus, setIsAccountSetupCommandRunning } from '../../../redux/actions';
//import { sendRCMCommand, sendRCMbackupZWaveCommand, sendRCMrestoreZWaveCommand } from '../../../rcm/rcm-helper';
//import { cancelSearchingWifi } from '../../../services/dealer-entered-programming.service';
//import { AbortZwaveBackupRestore } from '../../../services/save-restore-settings.service';
//import { abortfirmwaredownload } from '../../../services/firmware-download.service';
//import { learnAbort } from '../../../services/rcm.service';
import strings from '../../strings';
//import { start } from 'repl';
//import { stat } from 'fs';
//import { isDebug } from '../../is-debug';


const mapStateToProps = (state) => ({
    //isRunning: state.rcm.running,
    //lastCommand: state.rcm.lastCommand,
    //lastFullDownload: state.rcm.lastFullDownload,
    //keepOpen: !!state.rcm.responseErrorMessage || !!state.rcm.responseMessage || (state.rcm.responseMessage === strings.downloadCompletedSuccessfully),
    //message: state.rcm.responseMessage,
    //errorMessage: state.rcm.responseErrorMessage,    
    //checkOutRequestPending: state.rcm.checkOutRequesPending,
    //progressNum: parseInt(state.rcm.responseMessage),
    //isDebug: state.rcm.isDebug,
    //isCmdDone: state.rcm.isCmdDone,
    //isFirmwareDownloading: state.isFirmwareDownloading,
    //firmwareStatus: state.firmwareStatus.firmwareStatus,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    var radioid = '';
    var userinfo = configureStore.getState().userInfo;
    //if (userinfo) {
    //    radioid = configureStore.getState().radioid.radioID;
    //}

    return {

        abortFirewareDownload: () => { 
           // dispatch(setIsFirmwareDownloading(false));
            //dispatch(setIsAbort(true));
            //dispatch(setRunning(false));
            //abortfirmwaredownload({ radioID: radioid }).then(a => {

            //});
        }
        ,
        //closeZwavePopup: () => {
        //    dispatch(set_ZwaveRestoreBacup(false));
        //    dispatch(setResponseMessage(null));
        //    dispatch(setResponseErrorMessage(null));
        //    dispatch(setRunning(false));
        //},
        //AbortzwaveBackupRestoreProcess: () => {
        //    dispatch(set_ZwaveRestoreBacup(false));
        //    dispatch(setResponseMessage(null));
        //    dispatch(setResponseErrorMessage(null));
        //    dispatch(setRunning(false));
        //    AbortZwaveBackupRestore().then(a => {
        //    });

        //},
        //abortFirewareDownload: () => {
        //    dispatch(setIsFirmwareDownloading(false));
        //    dispatch(setIsAbort(true));
        //    dispatch(setRunning(false));
        //    abortfirmwaredownload({ radioID: radioid }).then(a => {

        //    });
        //}
        //,
        

        //abortAccountSetupCommand: () => {
        //    dispatch(setIsAccountSetupCommandRunning(false));
        //}
    }
};

const progressModal = ({ isFirmwareDownloading, firmwareStatus, isDebug, isCmdDone, progressNum, isRunning, keepOpen, lastCommand, lastFullDownload, message, errorMessage, stopWifiSerach, isDealerEnteredProgramming,
    isWifiSeraching, stopRunning, abortLearn, resetKeepOpen,  }) => (
        <div>
            {

                isFirmwareDownloading ?
                    <Modal show={isFirmwareDownloading} className="progress-modal">
                        <Modal.Body style={{ textAlign: 'center' }}>
                            <Loader style={{ display: (isFirmwareDownloading) ? 'block' : 'none' }} />
                            <h4 style={{ fontWeight: 'bold', display: (isFirmwareDownloading) ? 'block' : 'none' }}>{strings.firmwaredownloading}</h4>
                            <p style={{ display: (firmwareStatus && !errorMessage) ? 'block' : 'none' }}>{firmwareStatus}</p>
                            <p style={{ color: 'red', display: errorMessage ? 'block' : 'none' }}>{errorMessage}</p>                            
                        </Modal.Body>
                        <Modal.Footer >
                            <Button bsStyle={'danger'} style={{ display: isFirmwareDownloading ? 'inline' : 'none', fontWeight: 'bold' }} onClick={() => abortFirewareDownload()}>
                                {strings.abort}
                            </Button>

                        </Modal.Footer>
                    </Modal> :
                    null                    
            }
        </div>
    );

export default connect(mapStateToProps, mapDispatchToProps)(progressModal);
