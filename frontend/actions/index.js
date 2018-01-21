import superagent from 'superagent'
var socket = null;

// Login

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const loginSuccess = userId => ({
    type: LOGIN_SUCCESS,
    userId
})

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    error
})

export const loginRequest = username => ({
    type: LOGIN_REQUEST,
    username
})

export const login = username => {
    if (socket) return { type: 'NOOP' };
    return dispatch => {
        dispatch(loginRequest(username))
        superagent
        .post('/login')
        .send({ username })
        .then(res => {
            if (res.body.success) {
                console.log('Login res', res.body);
                const userId = res.body.user.id;
                socket = io();
                socket.once('connect', () => {
                    socket.emit('init', { userId }, error => {
                        if (error) {
                            console.error('Init error on server side', error)
                            socket.close()
                            socket = null
                            dispatch(loginFailure(error))
                        }
                        else {
                            dispatch(loginSuccess(userId))
                        }
                    });
                });
                socket.once('error', (error) => {
                    console.error('Connection error', error)
                    socket.close();
                    socket = null;
                    dispatch(loginFailure(error))
                });
            }
            else {
                dispatch(loginFailure(res.body.error))
            }
        })
    }
}


// Tracks
export const TRACK_SET_SOURCE = "TRACK_SET_SOURCE";
export const setSourceForTrack = (trackId, sourceId) => {
    return {
        type: TRACK_SET_SOURCE,
        trackId, sourceId
    }
}

export const STAGE_TRACKS = "STAGE_TRACKS"
export const COMMIT_TRACKS_REQUEST = "COMMIT_TRACKS_REQUEST"
export const COMMIT_TRACKS_SUCCESS = "COMMIT_TRACKS_SUCCESS"
export const COMMIT_TRACKS_FAILURE = "COMMIT_TRACKS_FAILURE"

// { title: 'Track title', index: 0, torrent: { infoHash: 'abc', name: 'torrent 1' }}

export const stageTracks = tracks => ({
    type: STAGE_TRACKS,
    tracks
})

export const commitTracks = tracks => {
    return dispatch => {
        dispatch({ type: COMMIT_TRACKS_REQUEST, tracks });
        socket.emit('addtracks', { tracks }, (error, addedTracks) => {
            if (error) {
                console.error('Add tracks error on server side', error)
                dispatch({ type: COMMIT_TRACKS_FAILURE, error })
            }
            else {
                dispatch({ type: COMMIT_TRACKS_SUCCESS, tracks: addedTracks })
            }
        });
    }
}

export const FETCH_TRACKS_REQUEST = "FETCH_TRACKS_REQUEST"
export const FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS"
export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE"

export const fetchTracks = () => {
    return dispatch => {
        dispatch({ type: FETCH_TRACKS_REQUEST });
        socket.emit('gettracks', { tracks }, (error, tracks) => {
            if (error) {
                console.error('Fetch tracks error on server side', error)
                dispatch({ type: FETCH_TRACKS_FAILURE, error })
            }
            else {
                dispatch({ type: FETCH_TRACKS_SUCCESS, tracks })
            }
        });
    }
}

// Sources
export const ADD_SOURCES = "ADD_SOURCES";
export const addSources = (sources) => {
    return dispatch => {
        socket.emit('addsources', { sources }, (error, sources) => {
            if (error) {
                console.error('Add sources error on server side', error)
                // dispatch({ type: FETCH_TRACKS_FAILURE, error })
            }
            else {
                dispatch({ type: ADD_SOURCES, sources });
            }
        });
    };
}