import React from 'react';
import PropTypes from 'prop-types';

import SourcePlug from './SourcePlug';
import SourceSlot from './SourceSlot';
import 'Assets/theme.sass';
import './style.scss';

class TrackItem extends React.Component {
    render() {
        const { id, title, artist, album } = this.props.track;
        const plug = (this.props.source) ? <SourcePlug onMoved={this.props.onSourceChange} trackId={id} source={this.props.source} /> : 'Drag source here';

        return (
            <div className="track-item">
                <span className="track-title">{title}</span>
                <span className="artist-album-line">{artist} - {album}</span>
                <SourceSlot 
                    trackId={id} >
                    {plug}
                </SourceSlot>
            </div>
        );
    }
}

TrackItem.propTypes = {
    track: PropTypes.object.isRequired,
    source: PropTypes.object,
    onSourceChange: PropTypes.func.isRequired
}

export default TrackItem;
