import './style.scss'
import React from 'react';

export default class TopMenu extends React.Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="header-content">
                    <div className="logo">LOGO</div>
                    <div className="search-box">
                        <div className="field has-addons is-horisontal">
                            <div className="control">
                                <input className="input" type="text" placeholder="Search"/>
                            </div>
                            <div className="control">
                                <a className="button is-primary">Search</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
