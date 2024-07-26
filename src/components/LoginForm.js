'use strict';

import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormGroup, InputGroup, FormControl, Form, Glyphicon, Button } from 'react-bootstrap';

import { AppLink } from '../common/components/controls';
import strings from '../common/strings';
import { string } from 'postcss-selector-parser';


export default ({ handleSubmit, handleChange, style, appVersion }) => (
    <div className="login" style={style}>
        <Form onSubmit={handleSubmit}>
            <span style={{ textAlign: 'center' }}><h3><b>{'Access Control System'}</b></h3></span>
            <FormGroup>                
                <label id="lblUsername">{'Client ID'}</label>
                <FormControl type="text" id="ClientID" name="ClientID" required onChange={handleChange} onKeyUp={handleChange}
                    placeholder={'Client ID'} style={{ textAlign: 'left' }} autoFocus />
            </FormGroup>
            <FormGroup>
                <label id="lblpassword">{'Client Secret'}</label>
                <FormControl type="password" id="ClientSecret" name="ClientSecret" required onChange={handleChange} onKeyUp={handleChange}
                    placeholder={'ClientSecret'} />
            </FormGroup>
            {/*<FormGroup>
                <label id="lblRadioSerialNo">{}</label>
                <FormControl type="text" id="radioSerialNo" name="radioSerialNo" required onChange={handleChange} onKeyUp={handleChange}
                    placeholder={strings.radioSerialNo} style={{ textAlign: 'left' }} />
            </FormGroup>*/}
            <input type="submit" value={strings.submit} className="btn btn-primary" />
            {/*<label style={{ textAlign: 'right', paddingTop: '10px' }}>V-{appVersion}</label>*/}
        </Form>
    </div >
);

