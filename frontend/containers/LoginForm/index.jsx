import React from 'react'
import { connect } from 'react-redux'
import 'Assets/theme.sass'
import cn from 'class-name'

import { login } from 'Actions'


class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            login: ''
        }
    }

    handleSubmit() {
        this.props.login(this.state.login)
    }

    handleChange(event) {
        this.setState({ login: event.target.value })
    }

    render() {
        return (
            <div className="login-form">
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="booper_dooper" onChange={this.handleChange.bind(this)} value={this.state.login}/>
                        <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className={cn(["button", { "is-loading": this.props.user.state == 'in_propgress' }])} onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: username => { dispatch(login(username)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
