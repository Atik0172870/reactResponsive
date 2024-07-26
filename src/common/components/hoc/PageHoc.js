'use strict';

import React from 'react';

import { Page } from '../controls';

const PageHoc = (pageInfo, WrappedComponent) => (props) => (
  <Page {...pageInfo}>
    <WrappedComponent {...props} />
  </Page>
);

export const withPage = (config) => PageHoc.bind(null, config);
