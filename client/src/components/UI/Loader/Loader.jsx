import React from 'react';
import PropTypes from 'prop-types';
import './Loader.less';

const propTypes = {
    isSmall: PropTypes.bool
};

const defaultProps = {
    isSmall: false
};

const Loader = (props) => {

    const loaderClass = props.isSmall ? 'loader small' : 'loader';
    return (
        <div className={loaderClass} title="Loading...">Loading...</div>
    );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;