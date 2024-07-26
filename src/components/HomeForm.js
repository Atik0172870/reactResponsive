'use strict';

import React, { Component } from 'react';
import strings from '../common/strings';
import { ButtonLink, AppLink, DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell } from '../common/components/controls';
import { isDebug } from '../common/is-debug';
import SmallLoader from '../common/SmallLoader/SmallLoader';
import { BiSolidUserDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
    logout, userAdd,
    userDetails
} from '../route-path';
//import { Test } from 'mocha';


const headers = [
    { content: "Name", grow: 15 },
    { content: "Email", grow: 15 },
    { content: "Details", grow: 5 },
    { content: "Delete", grow: 5 },
];



export default ({ users = [], selectedUser, onSelectUser, showUserDetails, isLoading }) => (
    <div className="home">
        <div className="panel panel-default">
            <div className='panel-heading home-panel-header'>
                <div className='common-loader-div'><h4>User List </h4> {isLoading ? <SmallLoader /> : ''}</div>
                <div><ButtonLink title="Add New User" className="btn-sm btn-default" to={userAdd}>
                    <i className="fa fa-plus" aria-hidden="true" />{'Add New'}
                </ButtonLink></div>
            </div>
            <div className='panel-body'>
                <div className="panel panel-default grid-panel">
                    <div className="panel-heading grid-panel-header grid-panel-header-btn">
                        <span className='btn btn-xs btn-primary' onClick={showUserDetails}>Show Details</span>
                        <span>|</span>
                        <span className='btn btn-xs btn-danger' onClick={showUserDetails}>Delete</span>
                    </div>
                    <div className="panel-body grid-panel-body">
                        <div className='grid-table'>
                            <div className='row grid-table-header'>
                                <div className='col-md-2 col-xs-12'>SL</div>
                                <div className='col-md-2 col-xs-12'>Name</div>
                                <div className='col-md-3 col-xs-12'>Email</div>
                                <div className='col-md-3 col-xs-12'>Phone</div>
                                {/* <div className='col-md-2'>Action</div> */}
                            </div>
                            <div className='grid-table-body'>
                                {
                                    users.length > 0 ?
                                        users.map((item, index) => {
                                            return (
                                                <div className={`row ${item.id == selectedUser.id ? "grid-selected-item" : ""}`} key={item.id} onClick={() => onSelectUser(item)}>
                                                    <div className='col-md-2 col-xs-12 disp-flex'><span className='show-mobile-header'>{'SL : '}</span> {index + 1}</div>
                                                    <div className='col-md-2 col-xs-12 disp-flex'><span className='show-mobile-header'>{'Name : '}</span> {item.firstName + ' ' + item.lastName}</div>
                                                    <div className='col-md-3 col-xs-12 disp-flex'><span className='show-mobile-header'>{'Email : '}</span> {item.email}</div>
                                                    <div className='col-md-3 col-xs-12 disp-flex'><span className='show-mobile-header'>{'Phone : '}</span> {item.phone}</div>
                                                </div>
                                            )
                                        }) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
