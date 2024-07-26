'use strict';

import React from 'react';

import { mergeClasses } from '../../utils/component-helpers';

export const Radio = (props) => (
    <span style={{ float: 'right' }}>
        <input type="radio" name="radio"  {...props} />
        <label htmlFor={props.id}><span></span></label>
    </span>
);

export const LabelRadio = ({ label, ...rest }) => (
    <UniformGrid>
        <label >{label}</label>
        <div>
            <Radio {...rest} />
        </div>
    </UniformGrid>
);

export const Select = ({ options = [], ...rest }) => (
    <select {...rest}>
        {
            options.map((o, i) => (
                <option key={i} value={o.value} >{o.text}</option>
            ))
        }
    </select>
);

export const LabelSelect = ({ label, className, ...rest }) => (
    <div className={mergeClasses('label-select', className)}>
        <label htmlFor={rest.id} style={{ marginRight: '0px' }}>{label}</label>
        <Select {...rest} />
    </div >
);

export const Checkbox = (props) => (
    <input type="checkbox" {...props} />
);

export const LabelCheckbox = ({ label, className, ...rest }) => (
    <div className={mergeClasses('label-checkbox', className)}>
        <label htmlFor={rest.id}>{label}</label>
        <Checkbox {...rest} />
    </div >
);

export const ReadOnlyTextBox = (props) => (
    <input type='text' readOnly style={{ border: 'none' }} {...props} />
);