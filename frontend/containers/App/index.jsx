import React from 'react'
import { connect } from 'react-redux'
import { connectStreamer } from 'Actions'
import $ from 'jquery'
import 'Assets/theme.sass'

import TrackPool from 'Containers/TrackPool'
import LoginForm from 'Containers/LoginForm'
import Player from 'Containers/Player'
import Controls from 'Containers/Controls'
import TrackList from 'Components/TrackList'

import { login } from 'Actions'


class App extends React.Component {
    constructor() {
        super()
        this.handleResize = this.handleResize.bind(this)
    }

    adaptMargin() {
        const headerHeight = this.$header.outerHeight();
        this.$content.css('top', headerHeight + 'px');
        console.log('Adapted padding to ', headerHeight);
    }

    handleResize() {
        this.adaptMargin();
    }

    componentDidMount() {
        this.$header = $('#header');
        this.$content = $('#content');
        $(window).resize(this.handleResize);
        this.adaptMargin();
    }

    render() {
        var page = (true || this.props.user.id) ? <TrackPool /> : <LoginForm />;
        const controls = <Controls />;
        return (
            <div className="app-wrapper">
                <div id="header" className="header">
                    <div className="container">
                        <div className="columns is-gapless is-multiline">
                            <div className="column is-narrow-tablet">
                                <span className="logo">
                                    <span className="left">Sound</span><span className="right">River</span>
                                </span>
                                <span className="is-hidden-tablet controls">{controls}</span>
                            </div>
                            <div className="column player-container">
                                <div className="stub is-hidden-mobile"></div>
                                <Player />
                            </div>
                            <div className="column is-narrow-tablet is-hidden-mobile">
                                <div className="controls">{controls}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div className="container">
                        <TrackList />
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
