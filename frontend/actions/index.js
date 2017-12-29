
export const CONNECT_STREAMER_REQUEST = "CONNECT_STREAMER_REQUEST"
export const CONNECT_STREAMER_SUCCESS = "CONNECT_STREAMER_SUCCESS"
export const CONNECT_STREAMER_FAILURE = "CONNECT_STREAMER_FAILURE"


export const requestConnectStreamer = (clientId) => ({
    type: CONNECT_STREAMER_REQUEST,
    clientId
})

export const connectStreamerSuccess = (clientId, socket) => ({
    type: CONNECT_STREAMER_SUCCESS,
    clientId,
    io: socket
})

export const connectStreamer = (clientId) => {
    return (dispatch) => {
        const socket = io();

        dispatch(requestConnectStreamer(clientId, socket));

        socket.once('connect', () => {
            dispatch(connectStreamerSuccess(clientId, socket));
        });
        socket.once('error', (error) => {
            console.error(error);
        });
    }
}
