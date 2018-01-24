import React from 'react'
import cn from 'class-name'
import './style.scss'

class TrackList extends React.Component {
    render() {
        let tracks = [];
        for (let i = 1; i < 32; i++) {
            tracks.push({
                title: `Track title ${i}`,
                album: `Album ${i}`,
                artist: `Artist ${i}`,
                length: `${(i+1) % 10}:${(i+5) % 10}${(i+2) % 10}`
            })
        }

        let number = 1;
        let trackListItems = _.map(tracks, track => {
            return (
                <li>
                    <span className="track-number">
                        <span className="track-number-nohover">{number++}</span>
                        <span className="track-number-hover">
                            <button><i className="fa fa-play" aria-hidden="true"></i></button>
                        </span>
                    </span>
                    <span className="track-info">
                        <span className="track-title">{track.title}</span>
                        <span className="track-sub">{track.artist} - {track.album}</span>
                    </span>
                    <span className="track-length">{track.length}</span>
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
