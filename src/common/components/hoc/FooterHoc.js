'use strict';

import React from 'react';

import { Footer } from '../controls';

const FooterHoc = (footerInfo, WrappedComponent) => (props) => (
    <div>
        <WrappedComponent {...props} />
        <Footer {...footerInfo } style={{ padding: '10px', marginBottom: '10px' }} />
    </div>
);

export const withFooter = (config) => FooterHoc.bind(null, config);
