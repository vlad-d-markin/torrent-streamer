import React from 'react'
import cn from 'class-name'
import PropTypes from 'prop-types';

function TabLink(props) {
    const { id, title, active, onClick } = props;
    return (
        <li className={cn({ "is-active" : active })}>
            <a onClick={() => {onClick(id)} }>{title}</a>
        </li>
    )
}

TabLink.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

export default TabLink
