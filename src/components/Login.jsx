import React, { Component } from 'react'
export default class Login extends Component {
    state = {

    }
    login = () => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        // console.log(REACT_APP_CLIENT_ID, REACT_APP_DOMAIN)
        const url = `${encodeURIComponent(window.location.origin)}`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }
    render() {
        return (
            <div>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}
