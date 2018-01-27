import React from 'react'
import PropTypes from 'prop-types';
import './style.scss';

function Controls(props) {
    const { username, onLogout } = props;
    return (
        <div className="user-controls">
            <span className="user-controls-current-user"><i className="fa fa-user-o" aria-hidden="true"></i>{username}</span>
            <a onClick={onLogout} className="user-controls-logout"><i className="fa fa-sign-out" aria-hidden="true"></i></a>
        </div>
    );
}

Controls.propTypes = {
    username: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default Controls;
