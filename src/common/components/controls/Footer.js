'use strict';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';

import { ButtonLink, AppLink  } from './AppLink';
import strings from '../../strings';
import { successToast, cancelToast, okAlert, noDataChangedToast, errorToast } from './index';
import { isDebug } from '../../is-debug';
import { logout } from '../../../route-path';

import ValidationModal from './ValidationModal';

const mapStateToProps = (state) => ({    
    //radioStatus: state.radioStatus.radioStatus
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    //checkOut: () => dispatch(setCheckOutRequestPending(true))
});

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRadioStatusULDL: false,
            radioStatus: '',
            isShowValidationMsg: false,
            validationData:[]
        };
        this.onSave = this.onSave.bind(this);
        this.onClickValidate = this.onClickValidate.bind(this);
    }

    async  componentDidMount() {
        
    }

    componentWillUnmount() {
       
    }

    componentDidUpdate() {    
        //if (this.state.radioStatus != this.props.radioStatus) {
        //    //if (this.props.radioStatus && (this.props.radioStatus.toUpperCase().includes("DOWNLOAD") || this.props.radioStatus.toUpperCase().includes("UPLOAD"))) {
        //    if (this.props.radioStatus && (this.props.radioStatus == "1" || this.props.radioStatus == "2" || this.props.radioStatus == "10" || this.props.radioStatus == "11" || this.props.radioStatus == "20" || this.props.radioStatus == "21" || this.props.radioStatus == "22")) {
        //        this.setState({
        //            isRadioStatusULDL: true,
        //            radioStatus: this.props.radioStatus
        //        });
        //    }
        //    else {
        //        this.setState({
        //            isRadioStatusULDL: false,
        //            radioStatus: this.props.radioStatus
        //        });
        //    }
        //}
    }

    async  onSave() {
        try {
            await this.props.onSave();
            //saveToast();

        } catch (e) {
            errorToast(e.message || e);
        }
    }

    onClickValidate() { 

        FireLinkDownloadValidation()
            .then(data => {                
                if (data.length > 0) {                                                           
                    this.setState({ isShowValidationMsg: true, validationData: data });                    
                }
                else {
                     successToast('All data is valid');
                }
            });
    }

    render() {
        const { onSave, onCancel, downloadCommand, style, ...rest } = this.props;
        const hasItems =onCancel || onSave || downloadCommand;
       // console.log(this.state.isRadioStatusULDL);
       // console.log(isPanelEventLogPage);
        return (

            <footer className="footer" style={{ ...style, justifyContent: isDebug ? 'space-between' : 'space-between', display: hasItems ? 'flex' : 'none' }}>               

                    <Button onClick={() => {
                        onCancel()                            
                            .catch(e => errorToast(e.message));
                    }} style={{
                        display: onCancel ? 'inline-block' : 'none', backgroundColor: '#FF99CC',
                        color: 'white', borderColor: '#FF99CC'
                    }} disabled={this.state.isRadioStatusULDL}
                        className="footer-button">
                        {strings.cancel}
                    </Button>
                

                <Button style={{ display: (onSave) ? 'inline-block' : 'none' }} onClick={this.onSave} disabled={this.state.isRadioStatusULDL}
                    bsStyle="success" className="footer-button">{strings.save}</Button>                
            </footer >
        );
    }
}
