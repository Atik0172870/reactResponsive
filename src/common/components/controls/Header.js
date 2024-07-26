'use strict';

import React, { Component } from 'react';

import { AppLink } from './AppLink';
import backWide from '../../../img/back-wide.png';
import strings from '../../strings';
import configureStore from '../../../redux/configureStore';
import { logout } from '../../../route-path';

   
export class Header extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
           // radioid: ''
        }
    }

    componentDidMount() {
       // var radioId = configureStore.getState().radioid.radioID;
        //this.setState({ radioid: radioId });
        //document.title = 'Radio# ' + radioId;
    }
            
    render() {
        return (<header>
            <AppLink to={(this.props.backURL == null || this.props.backURL == '') ? '/' : this.props.backURL} style={{ display: (this.props.isHome != null && this.props.isHome === true) ? 'none' : 'flex', color: 'white', fontSize: '12px' }} >
                {strings.back}
            </AppLink>
            <div className="header-title">
                {this.props.title}
            </div>
            <AppLink to={logout} style={{ display: 'flex', width: '60px', borderRadius: '5px', padding: '5px', color: 'white', fontSize: '12px' }}>
                    {strings.logout}
            </AppLink>            
        </header>);
    }
}

    
