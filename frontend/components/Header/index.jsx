import React from 'react';
import PropTypes from 'prop-types';

function Header (props) {
    return(
        <div className="columns is-gapless is-multiline">
            <div className="column is-narrow-tablet">
                <span className="logo">
                    <span className="left">Sound</span><span className="right">River</span>
                </span>
                <span className="is-hidden-tablet controls">{props.controls}</span>
            </div>
            <div className="column player-container">
                <div className="stub is-hidden-mobile"></div>
                {props.player}
            </div>
            <div className="column is-narrow-tablet is-hidden-mobile">
                <div className="controls">{props.controls}</div>
            </div>
        </div>
    )
}

Header.propTypes = {
    controls: PropTypes.object,
    player: PropTypes.object
}

export default Header
