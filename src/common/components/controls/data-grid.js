'use strict';

import React from 'react';

import { mergeClasses } from '../../utils/component-helpers';

export const DataTable = ({ children }) => (<div className="data-table table-striped">{children}</div>);

export const DataTableHeader = ({ headers, ...rest }) => (
    <div className="data-table-header" {...rest}>
        {
            headers.map(h => (
                <div key={h.key || h.content.toString()} style={{ flexGrow: h.grow.toString(), flexShrink: h.grow.toString() }}>
                    {
                        (typeof h.content === 'string') ? <p>{h.content}</p> : h.content
                    }
                </div>
            ))
        }
    </div>
);

export const DataTableTitleHeader = ({ headers, title, ...rest }) => (
    <div className="data-table-title-header" {...rest}>
        <div style={{ margin:'0 0 5px 5px' }}>{title}</div>
        <div>
            {
                headers.map(h => (
                    <div key={h.key || h.content.toString()} style={{ flexGrow: h.grow.toString(), flexShrink: h.grow.toString() }}>
                        {
                            (typeof h.content === 'string') ? <p>{h.content}</p> : h.content
                        }
                    </div>
                ))
            }
        </div>
    </div>
);

export const DataTableBody = ({ children, ...rest }) => (
    <div className="data-table-body" {...rest}>
        {children}
    </div>
);

export const DataTableCell = ({ children, ...rest }) => (
    <div className="data-table-cell" {...rest}>
        {children}
    </div>
);

export const DataTableRow = ({ children, className, ...rest }) => (
    <div className={mergeClasses('data-table-row', className)} {...rest}>
        {children}
    </div>
);