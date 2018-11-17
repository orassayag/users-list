import React from 'react';
import PropTypes from 'prop-types';
import './Item.less';

const propTypes = {
    items: PropTypes.array.isRequired
};

const defaultProps = {};

const Item = React.forwardRef((props, ref) => {
    const users = props.items.map((ctrl, i) => {
        return (
            <div key={i} className="table-data" ref={ref}>
                {props.items[i]}
            </div>
        );
    });

    return (
        <div className="table-row">
            {users}
        </div>
    );
});

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;