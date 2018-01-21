import './style.scss';
import React from 'react';
import Timeline from './Timeline.jsx';

export default class Controls extends React.Component {
    constructor() {
        super();
        this.hanldePlayPause = this.hanldePlayPause.bind(this);
        this.handleBackward = this.handleBackward.bind(this);
        this.handleForward = this.handleForward.bind(this);
    }

    hanldePlayPause() {
        if (this.props.isPlaying) {
            console.log('Pause');
            if (this.props.onPause) this.props.onPause();
        }
        else {
            console.log('Play');
            if (this.props.onPlay) this.props.onPlay();
        }
    }

    handleBackward() {
        console.log('Backward');
        if (this.props.onBackward) this.props.onBackward();
    }

    handleForward() {
        console.log('Forward');
        if (this.props.onForward) this.props.onForward();
    }

    render() {
        return (
            <div className="player-control-buttons">
                <a onClick={this.handleBackward} className="player-control player-control-back"><i className="fa fa-fast-backward" aria-hidden="true">&nbsp;</i></a>
                <a onClick={this.hanldePlayPause} className="player-control player-control-play"><i className="fa fa-play" aria-hidden="true"></i></a>
                <a onClick={this.handleForward} className="player-control player-control-forward"><i className="fa fa-fast-forward" aria-hidden="true"></i></a>
            </div>
        );
    }
}
