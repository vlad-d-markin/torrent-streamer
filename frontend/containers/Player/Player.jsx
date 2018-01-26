import './style.scss';
import React from 'react';
import createPlayer from 'web-audio-player';
import io from 'socket.io-client';
import Timeline from './Timeline.jsx';
import Controls from './Controls.jsx';
import TrackInfo from './TrackInfo.jsx';


export default class Player extends React.Component {
    constructor() {
        super();
        const socket = io('http://localhost:8080/streamer/test');
        socket.on('connect', function () {
            console.log('Connected to srv');
          });


          socket.on('error', function() {
              console.error('ERR');
          });


        //   io.on('error', function() {
        //       console.error('ERR');
        //   });


        this.state = {
            isPlaying: false
        };
    }
    play() {

    }

    render() {
        let controls = <Controls />;

        return (
            <div className="player-wrapper columns is-gapless">
                <div className="column is-narrow">
                    <TrackInfo />
                    <div className="is-hidden-tablet player-controls-mobile">{controls}</div>
                </div>
                <div className="column">
                    <Timeline />
                </div>
                <div className="column is-hidden-mobile is-narrow player-controls">
                    {controls}
                </div>
            </div>
        );
    }
}
