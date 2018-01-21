import React from 'react'
import {connect} from 'react-redux'
import { stageTracks, commitTracks } from 'Actions'
import 'Assets/theme.sass'
import _ from 'lodash';
import TorrentDropzone from 'Components/TorrentDropzone'

class TrackPool extends React.Component {
    constructor() {
        super();
    }

    handleTorrent(torrents) {
        var tracks = [];
        _.each(torrents, t => {
            _.each(t.torrent.files, (file, index) => {
                if (file.name.endsWith('.mp3')) {
                    tracks.push({
                        title: file.name,
                        index,
                        torrent: {
                            infoHash: t.torrent.infoHash,
                            name: t.torrent.name
                        }
                    });
                }
            });
        });
        this.props.stageTracks(tracks);
    }

    handleCommit() {
        this.props.commitTracks(this.props.tracks.staged);
    }

    render() {
        var tracks = [];
        _.each(this.props.tracks.list, (track) => {
            tracks.push(
                <tr key={track.id}>
                    <td>{track.title}</td>
                    <td>{track.torrent.infoHash}</td>
                    <td>{track.index}</td>
                    <td>xx</td>
                </tr>
            );
        });

        var staged = [];
        _.each(this.props.tracks.staged, (track) => {
            staged.push(
                <tr key={track.id} className="is-selected">
                    <td>{track.title}</td>
                    <td>{track.torrent.infoHash}</td>
                    <td>{track.index}</td>
                    <td>x</td>
                </tr>
            );
        });

        return (
                <div>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Torrent hash</th>
                            <th>Index</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colSpan={4}>
                                <TorrentDropzone onTorrents={this.handleTorrent.bind(this)} />
                                <div className="field is-grouped is-pulled-right">
                                    <div className="control">
                                        <a className="button">Cancel</a>
                                    </div>
                                    <div className="control">
                                        <a className="button" onClick={this.handleCommit.bind(this)}>Submit</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {tracks}
                        {staged}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tracks: state.tracks
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        stageTracks: tracks => { dispatch(stageTracks(tracks)) },
        commitTracks: tracks => { dispatch(commitTracks(tracks)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackPool)
