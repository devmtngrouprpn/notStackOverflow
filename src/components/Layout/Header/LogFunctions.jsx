import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { blueButton } from '../../../utilites/globals.js';
import { linkBlue } from '../../../utilites';
import styled from 'styled-components'


class LogFunctions extends Component {
    state = {

    }
    async componentDidMount() {
        let res = await axios.post('/api/user-data', { type: "login" });
        console.log(res.data)
        this.setState({ name: res.data.nickName })
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
            <>
                <LoginButton onClick={this.login}>Log In</LoginButton>
                <Signup onClick={this.login}>Sign Up</Signup>
            </>
        )
    }
}
export default LogFunctions;
const Signup = styled.div`
${blueButton()}
`
const LoginButton = styled.div`
color: ${linkBlue};
font-size: 13px;
padding: 8px 10px 8px 10px;
`
