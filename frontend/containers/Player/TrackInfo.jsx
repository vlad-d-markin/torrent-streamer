import './style.scss';
import React from 'react';
import Timeline from './Timeline.jsx';
import Controls from './Controls.jsx';

export default class TrackInfo extends React.Component {
    render() {
        return (
            <div className="player-track-info">
                    <p className="player-track-info-title">Track title</p>
                    <p className="player-track-info-subtitle">Artist - Album title</p>
            </div>
        );
    }
}
