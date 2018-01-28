import React from 'react'
import cn from 'class-name'
import './style.scss'

class TrackList extends React.Component {
    render() {
        let trackListItems = _.map(this.props.tracks, track => {
            return (
                <li key={track.id}>
                    <span className="track-number">
                        <span className="track-number-nohover">{track.number}</span>
                        <span className="track-number-hover">
                            <button><i className="fa fa-play" aria-hidden="true"></i></button>
                        </span>
                    </span>
                    <span className="track-info">
                        <span className="track-title">{track.title}</span>
                        <span className="track-sub">{track.artist} - {track.album}</span>
                    </span>
                    <span className="track-length">{track.length || '00:00'}</span>
                </li>
            );
        })

        return (
            <ul className="track-list">
                {trackListItems}
            </ul>
        );
    }
}

export default TrackList
