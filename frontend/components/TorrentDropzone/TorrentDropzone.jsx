import './style.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import parseTorrent from 'parse-torrent';
import async from 'async';
import _ from 'lodash';

export default class TorrentDropzone extends React.Component {
    handleError(error) {
        console.error('Torrent parse error', error);
        if (_.isFunction(this.props.onError)) this.props.onError(error);
    }

    handleTorrentsData(torrents) {
        console.log('Dropped torrents', torrents);
        if (_.isFunction(this.props.onTorrents)) this.props.onTorrents(torrents);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        var torrents = {};
        async.each(acceptedFiles, (file, cb) => {
            parseTorrent.remote(file, (error, torrent) => {
                if (error) return cb(error);
                torrents[torrent.infoHash] = {
                    file,
                    torrent
                };
                cb();
            });
        },
        (err) => {
            if (err) return this.handleError(err);
            this.handleTorrentsData(torrents);
        });
    }

    render() {
        return (
            <Dropzone
                // accept=".torrent"
                className="file-dropzone"
                activeClassName="file-dropzone-valid"
                rejectClassName="file-dropzone-invalid"
                onDrop={this.onDrop.bind(this)}>
                Drop .torrent files here
            </Dropzone>
        );
    }
}
