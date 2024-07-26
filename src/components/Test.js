'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withDebug } from '../common/components/hoc';
import { AppLink } from '../common/components/controls';
import { generalSettings, keyfobSettings, sensorConfiguration, userCodes, wirelessModules, logout } from '../route-path';
import strings from '../common/strings';
import { sendRCMCommand } from '../rcm/rcm-helper';
import panelCommand from '../rcm/panel-command';

const mapStateToProps = (state) => ({
    message: state.rcm.rawResponse
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

@withDebug
@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onchange = this.onchange.bind(this);
    }

    async  send(command) {
        this.setState({
            output: ''
        }, () => sendRCMCommand(command, this.state.inputList));
    }

    componentWillReceiveProps({ message }) {
        if (this.props.message !== message) {
            const prevOutput = this.state.output ? `${this.state.output}\r\n${'-'.repeat(150)}\r\n\r\n` : '';
            this.setState({ output: `${prevOutput}${message}` });
        }
    }

    onchange({ target }) {
        const { name, value } = target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="test">
                <div>
                    <button style={{ margin: '5px' }}
                        onClick={() => this.send(panelCommand.FireLink_Upload_All)}>{panelCommand.FireLink_Upload_All.toString()}</button>
                    <button style={{ margin: '5px' }}
                        onClick={() => this.send(panelCommand.FireLink_Download_All)}>{panelCommand.FireLink_Download_All.toString()}</button>                    
                </div>                
                <textarea name="inputList" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                    value={this.state.inputList} onChange={this.onchange} />
                <textarea name="output" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                    value={this.state.output} onChange={this.onchange} />
            </div>
        );
    }
};
