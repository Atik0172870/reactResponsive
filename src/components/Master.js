'use strict';

import React, { Component } from 'react';

import { ProgressModal, TContainer } from '../common/components/controls';

const masterStyle = {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: "stretch"
};

export default ({ children }) => (
    <div style={masterStyle}>
        <ProgressModal />       
        <TContainer />
        {children}
    </div>
);