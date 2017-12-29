import { CONNECT_STREAMER_REQUEST, CONNECT_STREAMER_SUCCESS, CONNECT_STREAMER_FAILURE } from 'Actions';

const initialState = {
    connection: {
        state: 'disconnected',
        clientId: null,
        io: null
    },
    notifications: [],
    sources: []
}

const connection = (connection, action) => {
    switch(action.type) {
        case CONNECT_STREAMER_REQUEST:
            return {
                ...connection,
                state: 'connecting'
            }
            break;
        case CONNECT_STREAMER_SUCCESS:
            return {
                ...connection,
                state: 'connected',
                clientId: action.clientId,
                io: action.socket
            }
        break;
        case CONNECT_STREAMER_FAILURE:
            return {
                ...connection,
                state: 'failure'
            }
            break;
        default:
            return connection;
            break;
    }
}

export default (state = initialState, action) => ({
    connection: connection(state.connection, action)
})
