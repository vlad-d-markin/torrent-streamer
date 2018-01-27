import _ from 'lodash'
import uuid from 'uuid/v4'
import Const from 'Const'


const initialState = {
    user: {
        state: 'none',
        id: null,
        name: 'null'
    },
    player: {},
    notifications: [],
    tracks: {
        byId: {},
        allIds: []
    },
    sources: {
        byId: {},
        allIds: []
    }
}

// User

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from 'Actions';

const user = (user, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...user,
                state: Const.user.state.LOGIN_IN_PROGRESS
            }
            break;
        case LOGIN_SUCCESS:
            return {
                ...user,
                state: Const.user.state.LOGGED_IN,
                id: action.userId,
                name: action.userName
            }
            break
        case LOGIN_FAILURE:
            return {
                ...user,
                state: Const.user.state.LOGIN_ERROR
            }
            break;
        case LOGOUT:
            return {
                ...user,
                state: Const.user.state.LOGGED_OUT
            }
            break;
    default:
        return user;
    }
}



// Tracks

import { TRACK_SET_SOURCE } from 'Actions';

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
