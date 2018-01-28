import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchTracks, fetchSources } from 'Actions'
import TrackList from 'Components/TrackList'
import Const from 'Const';

class TrackListContainer extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchSources();
        this.props.fetchTracks();
    }

    render() {
        const tracks = _.map(this.props.tracks.allIds, (trackId, index) => {
            const { id, title, album, artist } = this.props.tracks.byId[trackId];
            return {
                number: index + 1,
                title, album, artist, id
            }
        })
        return (<TrackList tracks={tracks} />)
    }
}

const mapStateToProps = (state) => {
    return {
        tracks: state.tracks,
        sources: state.sources
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTracks: () => { dispatch(fetchTracks()) },
        fetchSources: () => { dispatch(fetchSources()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer)
