import _ from 'lodash'
import uuid from 'uuid/v4'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'Actions';
import { STAGE_TRACKS, COMMIT_TRACKS_REQUEST, COMMIT_TRACKS_SUCCESS, COMMIT_TRACKS_FAILURE } from 'Actions';

const initialState = {
    user: {
        state: 'none',
        id: null
    },
    tracks: { list: {}, staged: {} },
    connection: {
        state: 'disconnected',
        clientId: null,
        io: null
    },
    notifications: [],
    sources: []
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
    case STAGE_TRACKS:
        return {
            ...tracks,
            staged: action.tracks
        };
    case COMMIT_TRACKS_SUCCESS:
    {
        var oldList = tracks.list;
        return {
            ...tracks,
            staged: [],
            list: {...oldList, ...action.tracks}
        }
    }
    default:
        return tracks;
    }
}


export default (state = initialState, action) => ({
    user: user(state.user, action),
    tracks: tracks(state.tracks, action)
})
