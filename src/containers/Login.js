'use strict';

import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';
import login from '../services/login.service';
import { GetAppVersion } from '../services/util.service';
import strings from '../common/strings';
import { withBusy } from '../common/components/hoc';
import { customAlert } from '../common/components/controls';



@withBusy({ message: strings.login })
export default class extends Component {
    constructor(props) {
        super(props);
        let encryptedUser = props.location.search;
        const encryptedUserInfo = encryptedUser.replace('?pt=', '').toString();
        console.log(props);
        console.log(encryptedUserInfo);
        this.state = {
            ClientID: '',
            ClientSecret: '',
            appVersion: '',

        };

        // console.log(this.state.encryptedUserInfo);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        GetAppVersion().then(e => {
            this.setState({ appVersion: e });
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.runWithBusy(() => {
            this.props.router.push('/');
        });
        // this.props.runWithBusy(() =>            
        //     login(e.target.elements[0].value, e.target.elements[1].value)
        //         .then(() => {                    

        //          this.props.router.push('/');

        //         })
        //         .catch(e => customAlert(e.message, strings.loginFailure))
        // );
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return <LoginForm style={{ display: this.state.encryptedUserInfo ? 'none' : 'flex' }}
            handleChange={this.handleChange} handleSubmit={this.handleSubmit} appVersion={this.state.appVersion} />
    };
}

