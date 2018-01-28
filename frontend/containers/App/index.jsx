import React from 'react'
import { connect } from 'react-redux'
import { initApplication } from 'Actions'

import 'Assets/theme.sass'

import HeaderContainer from 'Containers/HeaderContainer'
import Page from 'Components/Page'
import TabGroup from 'Components/TabGroup'
import Tab from 'Components/Tab'

import LoginForm from 'Containers/LoginForm'
import TrackListContainer from 'Containers/TrackListContainer'

import { login } from 'Actions'
import Const from 'Const';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: 'tracks'
        }
        this.switchTab = this.switchTab.bind(this)
    }

    componentDidMount() {
        this.props.initApplication();
    }

    switchTab(tabId) {
        this.setState({
            tab: tabId
        })
    }

    render() {
        const { user } = this.props;
        const isLoggedIn = user.state === Const.user.state.LOGGED_IN;
        const { tab } = this.state;

        const header = <HeaderContainer />

        return (
            <div className="app-wrapper">
                <Page header={header}>
                { isLoggedIn ? (
                        <TabGroup tab={tab} onTabSwicth={this.switchTab}>
                            <Tab id="tracks" title="Tracks">
                                <TrackListContainer />
                            </Tab>
                            <Tab id="edit" title="Edit">
                                track editor
                            </Tab>
                        </TabGroup>
                    ) : (
                        <LoginForm />
                )}
                </Page>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initApplication: username => { dispatch(initApplication()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
