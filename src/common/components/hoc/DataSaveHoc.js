'use strict';

import React, { Component } from 'react';

import { Debug } from '../controls';
import { login } from '../../../route-path';
import { errorToast, customConfirm } from '../controls';
import strings from '../../strings';

export default (config) => {
    return (WrappedComponent) => {
        return class extends Component {
            constructor(props) {
                super(props);                
                this.routerWillLeave = this.routerWillLeave.bind(this);
            }

            componentDidMount() {
                this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
            }

            routerWillLeave(nextLocation) {
                console.log('nextLocation');
                console.log(nextLocation);
                if (nextLocation.pathname === login) {
                    return true;
                }
                else {
                    
                    if (config.isDirty()) {
                        customConfirm('',
                            () => {
                                console.info(this.props);
                                config.onSave()
                                    .then(() => {
                                        if (!config.isDirty()) {

                                            this.props.router.push(nextLocation.pathname);                                            
                                        }
                                    });
                            },
                            () => {
                                config.onCancel();
                                this.props.router.push(nextLocation.pathname);                                
                            },
                            strings.confirmationSaveOrCancel,
                            strings.yes,
                            strings.noCancel);
                        
                        return false;
                    } else {
                        return true;
                    }                    
                   
                }
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
    }
}
