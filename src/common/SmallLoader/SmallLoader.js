
import React, { Component } from "react";
export default class SmallLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingText: `${this.props.loadingText || 'Loading...'}`,
            loaderClass: {
                border: `${this.props.border || '8px'} solid ${this.props.borderColor || '#f3f3f3'}`,
                borderRadius: '50%',
                borderTop: `${this.props.borderTop || '8px'} solid ${this.props.borderTopColor || 'Aqua'}`,
                borderBottom: `${this.props.borderBottom || '8px'} solid ${this.props.borderBottomColor || 'LightSlateGray'}`,
                borderRight: `${this.props.borderBottom || '8px'} solid ${this.props.borderBottomColor || 'green'}`,
                borderLeft: `${this.props.borderBottom || '8px'} solid ${this.props.borderBottomColor || 'blue'}`,
                width: `${this.props.width || '25px'}`,
                height: `${this.props.height || '25px'}`,

            }
        }
    }
    render() {
        return (
            <div className="loader-container">
                <div className="custom-loader"
                    style={{
                        border: `${this.state.loaderClass.border}`,
                        borderRadius: `${this.state.loaderClass.borderRadius}`
                        , borderTop: `${this.state.loaderClass.borderTop}`
                        , borderBottom: `${this.state.loaderClass.borderBottom}`
                        , borderRight: `${this.state.loaderClass.borderRight}`
                        , borderLeft: `${this.state.loaderClass.borderLeft}`
                        , width: `${this.state.loaderClass.width}`
                        , height: `${this.state.loaderClass.height}`
                    }}>
                </div>
                <div className="loading-text">{this.state.loadingText} </div>
            </div>

        )
    }
}