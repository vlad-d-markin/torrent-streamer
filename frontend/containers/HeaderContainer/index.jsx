import React from 'react'
import { connect } from 'react-redux'

import Header from 'Components/Header'
import Player from 'Components/Player'
import Controls from 'Components/Controls'
import Const from 'Const';

import { logout } from 'Actions'

class HeaderContainer extends React.Component {
    constructor() {
        super()
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        const isLoggedIn = this.props.user.state === Const.user.state.LOGGED_IN
        const username = this.props.user.name;

        const controls = isLoggedIn ? <Controls username={username} onLogout={this.handleLogout} /> : null
        const player = isLoggedIn ? <Player /> : null

        return(
            <Header controls={controls} player={player} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        player: state.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: username => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
