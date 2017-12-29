import React from 'react'
import { connect } from 'react-redux'
import { connectStreamer } from 'Actions'

class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.connect('CLENT ID IS HERE');
    }

    render() {
        return (
            <div className="app-wrapper">
                Test here! {this.props.connectionState}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connectionState: state.connection.state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        connect: clientId => { dispatch(connectStreamer(clientId)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
