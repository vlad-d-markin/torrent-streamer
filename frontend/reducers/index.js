import _ from 'lodash'
import uuid from 'uuid/v4'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'Actions';
import { TRACK_SET_SOURCE } from 'Actions';

const initialState = {
    user: {
        state: 'none',
        id: null
    },
    connection: {
        state: 'disconnected',
        clientId: null,
        io: null
    },
    notifications: [],
    tracks: {
        'track_id_1' : {
            id: 'track_id_1',
            title: 'Track 1',
            artist: 'Artist 1',
            album: 'Album 1',
            sourceId: 'source_id_1'
        },
        'track_id_2' : {
            id: 'track_id_2',                    
            title: 'Track 2',
            artist: 'Artist 2',
            album: 'Album 2',
            sourceId: 'source_id_2'
        },
        'track_id_3' : {
            id: 'track_id_3',                    
            title: 'Track 3',
            artist: 'Artist 3',
            album: 'Album 3',
            sourceId: null
        }
    },
    sources: {
        'source_id_1': {
            id: 'source_id_1',
            name: 'Source 1',
            infoHash: 'info_hash_1',
            index: 0
        },
        'source_id_2': {
            id: 'source_id_2',
            name: 'Source 2',
            infoHash: 'info_hash_2',
            index: 2
        },
        'source_id_3': {
            id: 'source_id_3',
            name: 'Source 3',
            infoHash: 'info_hash_3',
            index: 6
        }
    }
}



const user = (user, action) => {
    switch(action.type) {
    case LOGIN_REQUEST:
        return {
            ...user,
            state: 'in_propgress'
        }
        break;
    case LOGIN_SUCCESS:
        return {
            ...user,
            state: 'logged_in',
            id: action.userId
        }
        break
    case LOGIN_FAILURE:
        return {
            ...user,
            state: 'failure'
        }
        break;
    default:
        return user;
    }
}


const tracks = (tracks, action) => {
    switch(action.type) {
    case TRACK_SET_SOURCE:
    {
        var state = {...tracks};
        state[action.trackId].sourceId = action.sourceId;
        return state;
    }
    default:
        return tracks;
    }
}


import { ADD_SOURCES } from 'Actions';

const sources = (state, action) => {
    switch(action.type) {
    case ADD_SOURCES:
        return {...state, ...action.sources };
        break;
    default:
        return state;
    }
}

export default (state = initialState, action) => {
    return {
        user: user(state.user, action),
        tracks: tracks(state.tracks, action),
        sources: sources(state.sources, action)
    }
}
