import './style.scss';
import React from 'react';

export default class Timeline extends React.Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        const progress = (this.props.progress / this.props.total) * 100;
        const cached = 0;

        return (
            <div className="player-timeline-wrapper">
                <div className="player-timeline">
                    <div style={{ left: progress + '%' }} className="player-timeline-slider"></div>
                    <div style={{ width: cached + '%'  }} className="player-timeline-cached"></div>
                    <div style={{ width: progress + '%' }} className="player-timeline-position"></div>
                </div>
            </div>
        );
    }
}
