import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    state = {

    }


    render() {
        return (
            <div>
                <button onClick={this.login}>Login</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
