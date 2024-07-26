'use strict';

import React from 'react';

import { Header } from './Header';
import Footer from './Footer';

export const Page = ({ title, children, backURL, isHome, ...rest }) => (
    <div className="page container" >
        <Header title={title} backURL={backURL} isHome={isHome} {...rest} />
        <div className="page-body">{children}</div>
        <Footer {...rest} />
    </div>
);
