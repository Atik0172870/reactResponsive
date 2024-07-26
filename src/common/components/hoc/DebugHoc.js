'use strict';

import React from 'react';

import { Debug } from '../controls';


export const withDebug = (WrappedComponent) => (props) => (
    <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', display: 'flex', flexDirection: 'column' }}>
        <WrappedComponent {...props} />
        <Debug />
    </div>
);
