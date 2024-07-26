'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
//import Modal from 'react-responsive-modal';
import strings from '../../strings';
import {
        DataTable, DataTableCell,
    DataTableHeader, DataTableTitleHeader, DataTableBody, DataTableRow, GridSaveButton,
} from './index';


const validationHeaders = [
    { content: '#', grow: 1 },
    { content: 'Message', grow: 5 }

];

export default class extends Component {
    constructor(props) {
        super(props);
        let isShow = props.isShowValidationMsg ? true : false;
        console.log(props);
        this.state = {
            isShowValidationMsg: isShow,
            validationData: props.validationData,
            validationDataNofilter: props.validationData,
            MessageType: '0', 
            GroupType: '0',
            
        };
        this.onCloseValidationModal = this.onCloseValidationModal.bind(this);        
        //this.getData = this.getData.bind(this);
        this.onChangeValidationType = this.onChangeValidationType.bind(this);
    }

    componentDidMount() {
      // this.getData();
    }

    onCloseValidationModal() {
        this.setState({ isShowValidationMsg: false });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.state.isShowValidationMsg != nextProps.isShowValidationMsg) {
            this.setState({ isShowValidationMsg: nextProps.isShowValidationMsg, validationDataNofilter: nextProps.validationData, validationData: nextProps.validationData });            
        }
    }

    //getData() {
    //    FireLinkDownloadValidation()
    //        .then(data => {
    //            console.log(data);
    //            if (data.length > 0) {
    //                //showModal('ok');
    //                console.log(data);
    //                if (data.length > 0) {
    //                    this.setState({ isShowValidationMsg: true, validationDataNofilter: data, validationData: data });
    //                }
    //            }
    //            else {
    //                this.setState({
    //                    isShowValidationMsg: false,
    //                }, () => { successToast('All data is valid') });
                    
    //            }
    //        });
    //}

    onChangeValidationType({ target }) {
        let { value, checked, name, type } = target;
        console.log(value, checked, name, type);
        this.setState({
            [name]: value
        }, () => {
                console.log(this.state);
                if (this.state.MessageType === '0' && this.state.GroupType === '0') {
                    let data = this.state.validationDataNofilter;
                    this.setState({ validationData: data });
                }
                else if (this.state.MessageType !== '0' && this.state.GroupType === '0') {
                    let data = this.state.validationDataNofilter.filter(e => e.ErrorType === parseInt(this.state.MessageType));
                    this.setState({ validationData: data });
                }
                else if (this.state.MessageType === '0' && this.state.GroupType !== '0') {
                    let data = this.state.validationDataNofilter.filter(e => e.GroupName === parseInt(this.state.GroupType));
                    this.setState({ validationData: data });
                }
                else {
                    let data = this.state.validationDataNofilter.filter(e => e.GroupName === parseInt(this.state.GroupType)).filter(e => e.ErrorType === parseInt(this.state.MessageType));
                    this.setState({ validationData: data });
                }
        });

    }

    render() {
        return (
            <Modal open={this.state.isShowValidationMsg} onClose={this.onCloseValidationModal} >
                <div className="validation-div" style={{ textAlign: 'center' }}>
                    <h3><u>Error Check List</u></h3>
                    <div className="filter">
                        <div>
                        <label>Validation Type : </label>
                        <select name="MessageType" value={this.state.MessageType} onChange={this.onChangeValidationType}>
                        <option value="0">Error and Warning</option>
                        <option value="1">Error Only</option>
                        <option value="2">Warning Only</option>
                        </select>
                    </div>
                        <div>
                    <label>Group : </label>
                    <select name="GroupType" value={this.state.GroupType} onChange={this.onChangeValidationType}>
                        <option value="0">All</option>
                        <option value="1">Fire</option>
                        <option value="2">EZM Module</option>
                        <option value="3">Zone</option>
                        <option value="4">Report Telco 1</option>
                        <option value="5">Keypad</option>
                        <option value="6">User</option>
                        <option value="7">Wireless/SLC/KeyFobs/Recivers</option>
                        <option value="8">Carbon Monoxide</option>
                        <option value="9">Releay Module</option>
                        <option value="10">SLC Smoke/DUCT</option>
                            <option value="11">Reporting</option>
                        </select>
                        </div>
                    </div>
                    <DataTable>
                        <DataTableTitleHeader headers={validationHeaders} />
                        <DataTableBody>
                            {this.state.validationData.length === 0 ?
                                'No Data'
                                :
                                this.state.validationData.map(d =>
                                    <DataTableRow key={d.RowNumber.toString()} className="validation-data-table-row">
                                        <DataTableCell>
                                            <label> {d.RowNumber}</label>
                                        </DataTableCell>
                                        <DataTableCell>
                                            <label class={d.ErrorType == 1 ? ' error ' : ' warning '} > {d.ErrorMessage}</label>
                                        </DataTableCell>
                                    </DataTableRow>
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                </div>
                <div style={{ justifyContent: 'center', display: 'flex', paddingTop: '10px' }}>
                    <GridSaveButton style={{ width: '100px' }} onClick={this.onCloseValidationModal}>{strings.ok}</GridSaveButton>
                </div>
            </Modal >
);
    }
}