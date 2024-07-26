'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withPage, withDebug, withBusy } from '../common/components/hoc';
import { allUpToDateToast, errorToast, customConfirm } from '../common/components/controls';
import { getAllActiveUser } from '../services/user.service';
import strings from '../common/strings';
import { HomeForm } from '../components';
import configureStore from '../redux/configureStore';
import { setUserList } from '../redux/actions';


const config = {
    title: strings.NapcoAccessControlSystem,
    isHome: true,
};

const mapStateToProps = (state) => ({

});

@withPage(config)
@withDebug
@withBusy({ message: strings.loading })
@connect(mapStateToProps)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { id: 1, firstName: 'Ahtear', lastName: 'Rahman', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 2, firstName: 'Nasir', lastName: 'Uddin', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 4, firstName: 'Atik', lastName: 'Hasan', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 5, firstName: 'Masum', lastName: 'Billah', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 6, firstName: 'John', lastName: 'Mack', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 7, firstName: 'Yousaf', lastName: 'Elahi', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 8, firstName: 'Erphan', lastName: 'Elahi', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 9, firstName: 'Test', lastName: 'User', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 10, firstName: 'Test 2', lastName: 'User', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 11, firstName: 'Test 3', lastName: 'User', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 12, firstName: 'Test 4', lastName: 'User', email: 'ahtear@ael-bd.com', phone: '01516162081' },
                { id: 13, firstName: 'Test 5', lastName: 'User', email: 'ahtear@ael-bd.com', phone: '01516162081' },

            ],
            selectedUser: { id: 1, firstName: 'Ahtear', lastName: 'Rahman', email: 'ahtear@ael-bd.com' },
            isLoading: false
        };
    }


    componentDidMount() {
        // let data = configureStore.getState().userList;
        // console.log(data);
        // console.log(typeof (data));
        // console.log(data.length);
        // if (data && data.length > 0) {
        //     this.setState({ users: data });
        // }
        // else {
        //     this.getAllActiveUsers();
        // }
    }


    getAllActiveUsers = () => {
        try {
            this.setState({ isLoading: true });
            getAllActiveUser().then(data => {
                console.log(data);
                configureStore.dispatch(setUserList(data));
                this.setState({ users: data, isLoading: false });
            });
        } catch (error) {
            this.setState({ isLoading: false });
            console.Console(error);
        }
    }

    onSelectUser = (user) => {
        this.setState({ selectedUser: user });
    }

    render() {
        console.log(this.state);
        return (
            <HomeForm  {...this.state} onSelectUser={this.onSelectUser} />
        );
    }
}
