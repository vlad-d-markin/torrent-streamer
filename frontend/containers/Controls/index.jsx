import React from 'react'

import 'Assets/theme.sass';
import './style.scss';

class Controls extends React.Component {
    render() {
        return (
            <div className="user-controls">
                <span className="user-controls-current-user"><i className="fa fa-user-o" aria-hidden="true"></i>username</span>
                <a className="user-controls-logout"><i className="fa fa-sign-out" aria-hidden="true"></i></a>
            </div>
        );
    }
}

export default Controls;