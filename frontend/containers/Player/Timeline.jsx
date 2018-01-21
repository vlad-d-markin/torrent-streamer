import './style.scss';
import React from 'react';

export default class Timeline extends React.Component {
    render() {
        return (
            <div className="player-timeline">
                <div className="player-timeline-cached"></div>
                <div className="player-timeline-position"></div>
            </div>
        );
    }
}
