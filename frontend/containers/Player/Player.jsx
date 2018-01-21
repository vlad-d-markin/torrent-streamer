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
        return (
            <div className="player-wrapper">
                <div className="player-content">
                    <Timeline maxVal={100} cached={50} position={30} onPosition={null} />
                    <div className="player-controls-wrapper">
                        <Controls onPlay={this.play.bind(this)} isPlaying={this.state.isPlaying} />
                        <TrackInfo />
                    </div>
                </div>
            </div>
        );
    }
}
