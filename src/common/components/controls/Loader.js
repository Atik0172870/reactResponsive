'use strict';

import React from 'react';
import '../../../styles/loader.scss';
import { mergeClasses } from '../../utils/component-helpers';
import strings from '../../strings';

export default ({ className, ...rest }) => (<div className={mergeClasses('loader', className)} {...rest}>{strings.loading}</div>);