'use strict';

import React from 'react';
import { Link } from 'react-router';

import { mergeClasses } from '../../utils/component-helpers';

export const AppLink = (props) => (
    <Link {...props} />
);

export const ButtonLink = ({ content, children, className, style, ...rest }) => (
    <AppLink className={mergeClasses('btn', className)} {...rest} >
        {content || children}
    </AppLink>
);

export const ImageLink = ({ imgClassName, src, alt, content, children, style, ...rest }) => (
    <AppLink {...rest} style={{ display: 'flex', alignItems: 'center', ...style }}>
        <img className={imgClassName} src={src} alt={alt} />{content || children}
    </AppLink>
);