import superagent from 'superagent'
var socket = null;

function connect(userId, cb) {
    socket = io();
    socket.once('connect', () => {
        socket.emit('init', { userId }, (error, user) => {
            if (error) {
                console.error('Init error on server side', error)
                socket.close()
                socket = null
                cb(error)
            }
            else {
                cb(false, user)
            }
        });
    });
    socket.once('error', (error) => {
        console.error('Connection error', error)
        socket.close();
        socket = null;
        cb(error)
    });
}

// Init

export const INIT_APP = "INIT_APP"
export const initApplication = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            connect(userId, (error, user) => {
                if (error) {
                    console.log('Init: login failure', error)
                    dispatch(loginFailure(error))
                }
                else {
                    dispatch(loginSuccess(userId.id, user.username))
                }
            })
        }
    }
}

// Login

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const loginSuccess = (userId, userName) => ({
    type: LOGIN_SUCCESS,
    userId,
    userName
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
                const userId = res.body.user.id;
                connect(userId, error => {
                    if (error) {
                        console.error('Connect error', error)
                        dispatch(loginFailure(error))
                    }
                    else {
                        localStorage.setItem('userId', userId)
                        dispatch(loginSuccess(userId, username))
                    }
                })
            }
            else {
                console.error('Login error', res.body.error)
                dispatch(loginFailure(res.body.error))
            }
        })
    }
}

export const LOGOUT = "LOGOUT"
export const logout = () => {
    return dispatch => {
        if (socket) {
            console.log('Connection closed on logout')
            socket.close();
            socket = null;
        }
        localStorage.setItem('userId', null)
        dispatch({ type: LOGOUT })
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

// Fetching tracks

export const FETCH_TRACKS_REQUEST = "FETCH_TRACKS_REQUEST"
export const FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS"
export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE"

export const fetchTracks = () => {
    return dispatch => {
        dispatch({ type: FETCH_TRACKS_REQUEST });
        socket.emit('gettracks', {}, (error, tracks) => {
            if (error) {
                console.error('Fetch tracks error on server side', error)
                dispatch({ type: FETCH_TRACKS_FAILURE, error })
            }
            else {
                console.log('Tracks', tracks)
                dispatch({ type: FETCH_TRACKS_SUCCESS, tracks })
            }
        });
    }
}

// Fetching sources

export const FETCH_SOURCES_REQUEST = "FETCH_SOURCES_REQUEST"
export const FETCH_SOURCES_SUCCESS = "FETCH_SOURCES_SUCCESS"
export const FETCH_SOURCES_FAILURE = "FETCH_SOURCES_FAILURE"

export const fetchSources = () => {
    return dispatch => {
        dispatch({ type: FETCH_SOURCES_REQUEST })
        socket.emit('getsources', {}, (error, sources) => {
            if (error) {
                console.log('Fetch sources error', error)
                dispatch({ type: FETCH_SOURCES_FAILURE, error })
            }
            else {
                console.log('Sources', sources)
                dispatch({ type: FETCH_SOURCES_SUCCESS, sources })
            }
        })
    }
}


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
