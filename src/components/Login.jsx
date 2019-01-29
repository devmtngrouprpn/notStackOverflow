import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    state = {

    }
    async componentDidMount() {
        let res = await axios.post('/api/user-data', { type: "login" });
        console.log(res.data)
    }
    login = () => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        // console.log(REACT_APP_CLIENT_ID, REACT_APP_DOMAIN)
        const url = `http://localhost:4000/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }
    logout = async () => {
        let res = await axios.post('/api/user-data', { type: "logout" });
        console.log(res.data)
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
