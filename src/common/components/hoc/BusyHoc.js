'use strict';

import React, { Component } from 'react';

import { BusyModal } from '../controls';
import strings from '../../strings';

export default (config) => {
    const { message, style } = config || {};
    return (WrappedComponent) => {
        return class extends Component {
            constructor(props) {
                super(props);
                this.runWithBusy = this.runWithBusy.bind(this);
                this.state = {
                    isBusy: false,
                    message: message || strings.loading
                };
            }

            runWithBusy(callback, message) {
                return new Promise((resolve, reject) => {
                    this.setState({
                        isBusy: true,
                        message: message || this.state.message
                    });
                    callback()
                        .then(() => this.setState({
                            isBusy: false
                        }, resolve))
                        .catch(e => {
                            this.setState({
                                isBusy: false
                            }, reject(e.message))
                        });
                });
            }

            render() {
                return (
                    <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', display: 'flex', flexDirection: 'column', ...style }}>
                        <BusyModal {...this.state} />
                        <WrappedComponent {...this.props} runWithBusy={this.runWithBusy} />
                    </div >
                );
            }
        }
    }
}
