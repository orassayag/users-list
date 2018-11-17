import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Layout.less';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {};

class Layout extends Component {
    render() {
        return (
            <div className="main-container">
                {this.props.children}
            </div>
        );
    }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;