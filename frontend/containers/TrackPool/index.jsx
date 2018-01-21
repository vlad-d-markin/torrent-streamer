import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { addSources, setSourceForTrack } from 'Actions';
import 'Assets/theme.sass';
import TorrentDropzone from 'Components/TorrentDropzone';
import TrackItem from './TrackItem';
import SourcePlug from './SourcePlug';
import './style.scss';


class TrackPool extends React.Component {
    constructor() {
        super();
        
    }

    handleTorrent(torrents) {
        var sources = [];
        _.each(torrents, t => {
            _.each(t.torrent.files, (file, index) => {
                if (file.name.endsWith('.mp3')) {
                    sources.push({
                        name: file.name,
                        index,
                        infoHash: t.torrent.infoHash
                    });
                }
            });
        });
        this.props.addSources(sources);
    }

    handleCommit() {
        this.props.commitTracks(this.props.tracks.staged);
    }

    handleSourceUpdate({ source, fromTrack, toTrack }) {
        if (fromTrack) this.props.setSourceForTrack(fromTrack, null);
        this.props.setSourceForTrack(toTrack, source.id);
    }

    isSourceTaken(sourceId, tracks) {
        return _.find(tracks, (t) => {
            return t.sourceId === sourceId;
        });
    }

    render() {
        var tracks = _.map(this.props.tracks, (t) => {
            return (
                <li key={t.id}>
                    <TrackItem 
                        key={t.id} 
                        track={t}
                        source={this.props.sources[t.sourceId]}
                        onSourceChange={this.handleSourceUpdate.bind(this)}
                        />
                </li>
            );
        });
        const freeSources = _.filter(this.props.sources, (s) => {
            return !this.isSourceTaken(s.id, this.props.tracks);
        });
        const freeSourceItems = _.map(freeSources, (s) => {
            return (
                <li key={s.id}>
                    <SourcePlug 
                        key={s.id}
                        onMoved={this.handleSourceUpdate.bind(this)}
                        source={s} />
                </li>
            );
        });

        return(<div className="columns">
            <div className="column">
                <h3>Tracks</h3>
                <ul className="pool-list">
                    {tracks}
                </ul>
            </div>
            <div className="column">
                <h3>Sources</h3>
                <ul>
                    {freeSourceItems}
                </ul>
            </div>
            <TorrentDropzone onTorrents={this.handleTorrent.bind(this)} />
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        tracks: state.tracks,
        sources: state.sources
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        addSources: sources => { dispatch(addSources(sources)); },
        setSourceForTrack: (trackId, sourceId) => { dispatch(setSourceForTrack(trackId, sourceId)); }
    }
}

export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps)(TrackPool)
)
