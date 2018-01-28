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
        allIds: [],
        fetching: false
    },
    sources: {
        byId: {},
        allIds: [],
        fetching: false
    }
}

// App



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

import { FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE } from 'Actions';

const tracks = (state, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case FETCH_TRACKS_SUCCESS:
        {
            const tracksById = {};
            _.each(action.tracks, track => {
                tracksById[track.id] = track;
            })
            return {
                ...state,
                byId: tracksById,
                allIds: _.keys(tracksById),
                fetching: false
            }
        }
        case FETCH_TRACKS_FAILURE:
            return {
                ...state,
                fetching: false
            }
        default:
            return state;
    }
}

// Sources

import { FETCH_SOURCES_REQUEST, FETCH_SOURCES_SUCCESS, FETCH_SOURCES_FAILURE } from 'Actions';

const sources = (state, action) => {
    switch (action.type) {
        case FETCH_SOURCES_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case FETCH_SOURCES_SUCCESS:
            {
                const sourcesById = {};
                _.each(action.sources, source => {
                    sourcesById[source.id] = source;
                })
                return {
                    ...state,
                    byId: sourcesById,
                    allIds: _.keys(sourcesById),
                    fetching: false
                }
            }
        case FETCH_SOURCES_FAILURE:
            return {
                ...state,
                fetching: false
            }
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
