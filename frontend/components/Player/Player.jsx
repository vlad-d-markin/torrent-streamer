import './style.scss';
import React from 'react';
import io from 'socket.io-client';
import Timeline from './Timeline.jsx';
import Controls from './Controls.jsx';
import TrackInfo from './TrackInfo.jsx';

import * as player from '../../player'

export default class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            duraton: 0,
            position: 0
        };

        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)

        player.on('duration', (duration) => {
            this.setState({ duration })
        })
        player.on('position', (position) => {
            this.setState({ position })
        })
    }

    play() {
        player.setSource('http://localhost:8080/stream/3ffec6af5acbe42643c343dfd63acb7fbb03cc74/1?uid=c781f1da-7d9e-4dd5-b812-e6bcab8471ee');
        player.play();
    }

    pause() {

    }

    render() {
        let controls = <Controls onPlay={this.play} onPause={this.pause} isPlayng={this.state.isPlaying} />;

        return (
            <div className="player-wrapper columns is-gapless">
                <div className="column is-narrow">
                    <TrackInfo />
                    <div className="is-hidden-tablet player-controls-mobile">{controls}</div>
                </div>
                <div className="column">
                    <Timeline progress={this.state.position} total={this.state.duration} />
                </div>
                <div className="column is-hidden-mobile is-narrow player-controls">
                    {controls}
                </div>
            </div>
        );
    }
}
