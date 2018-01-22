import React from 'react'
import { connect } from 'react-redux'
import { connectStreamer } from 'Actions'
import 'Assets/theme.sass'

import TrackPool from 'Containers/TrackPool'
import LoginForm from 'Containers/LoginForm'
import Player from 'Containers/Player'
import Controls from 'Containers/Controls'

import { login } from 'Actions'


class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.login('test');
    }

    render() {
        var page = (true || this.props.user.id) ? <TrackPool /> : <LoginForm />;
        return (
            <div className="app-wrapper">
                <div className="header">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-2 logo"><span className="left">Sound</span><span className="right">River</span></div>
                            <div className="column player"><Player /></div>
                            <div className="column is-2 controls"><Controls /></div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                    content
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: username => { dispatch(login(username)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
