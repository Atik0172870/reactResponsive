'use strict';

import React from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';


import strings from '../../strings';
import ResetImage from '../../../img/Reset.png';

export const GridSaveButton = ({ onClick, style, children, disabled = false }) => (<Button bsStyle="success" disabled={disabled} style={style} className="grid-save-button" onClick={onClick}>{children || strings.save}</Button>);
export const GridRemoveButton = ({ onClick, children, style }) => (<Button bsStyle="danger" style={style} className="grid-remove-button" onClick={onClick}>{children ||strings.del}</Button>);
export const GridRemoveButtonDisable = ({ onClick, children }) => (<Button bsStyle="danger" className="grid-remove-button hide" onClick={onClick} disabled>{children ||strings.del}</Button>);

export const GridResetButton = ({ onClick, style, children, disabled = false, value }) => (<img disabled={disabled} onClick={onClick} value={value} src={ResetImage} height="30px" width="30px" />);
export const RefreshButton = ({ onClick, style, children, disabled = false, value }) => (<img disabled={disabled} onClick={onClick} value={value} src={ResetImage} height="30px" width="30px" />);


