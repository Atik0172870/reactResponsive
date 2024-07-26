'use strict';

import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from './Loader';
import strings from '../../strings';


export default ({ isBusy, message }) => (
    <div className="busy-modal" style={{ display: isBusy ? 'block' : 'none' }}>
        <div className="loading-text">
            {
                message.split('').map((v, i) => <span key={i} className="loading-text-words">{v}</span>)
            }
        </div>
    </div>
);

