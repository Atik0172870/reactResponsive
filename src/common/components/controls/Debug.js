'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppLink } from '../../components/controls';
//import { generalSettings, keyfobSettings, sensorConfiguration, userCodes, wirelessModules, logout } from '../../../route-path';
import strings from '../../strings';
//import { sendRCMCommand } from '../../../rcm/rcm-helper';
//import panelCommand from '../../../rcm/panel-command';
import { isDebug } from '../../is-debug';

const mapStateToProps = (state) => ({
   // message: state.rcm.rawResponse
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
       // this.onchange = this.onchange.bind(this);
    }

    async  send(command) {
        //this.setState({
        //    output: ''
        //}, () => sendRCMCommand(command, this.state.input));
    }

    componentWillReceiveProps({ message }) {
        //if (this.props.message !== message) {
        //    const prevOutput = this.state.output ? `${this.state.output}\r\n${'-'.repeat(150)}\r\n\r\n` : '';
        //    this.setState({ output: `${prevOutput}${message}` });
        //}
    }

    //onchange({ target }) {
    //    const { name, value } = target;
    //    this.setState({
    //        [name]: value
    //    });
    //}

    render() {
        //if (isDebug) {
        //if (this.state.output && this.state.output != "null") {
        //    console.log(this.state.output);
        //}        
        //}
        //return (
        //    <textarea name="output" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
        //        style={{textAlign:'initial', minHeight:'25vh'}}
        //        value={this.state.output} onChange={this.onchange} />
        //);
        return false;
    }
};
