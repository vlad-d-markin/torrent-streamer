import React from 'react'
import { connect } from 'react-redux'
import { connectStreamer } from 'Actions'
import 'Assets/theme.sass'

import TrackPool from 'Containers/TrackPool'
import LoginForm from 'Containers/LoginForm'
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
            <div className="app-wrapper-container container">
                {page}
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
