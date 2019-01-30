import React, { Component } from 'react';
import axios from 'axios'
import { blueButton } from '../../../utilites/globals.js';
import { linkBlue } from '../../../utilites';
import styled from 'styled-components'
import { addToUser, destroyUser } from '../../../ducks/reducer'
import { connect } from 'react-redux'


class LogFunctions extends Component {
    state = {

    }
    async componentDidMount() {

        let res = await axios.post('/api/user-data', { type: "login" });
        this.props.addToUser(res.data)
        console.log(this.props.user)
    }
    login = () => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env
        // console.log(REACT_APP_CLIENT_ID, REACT_APP_DOMAIN)
        const url = `http://localhost:4000/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }
    logout = async () => {
        let res = await axios.post('/api/user-data', { type: "logout" });
        this.props.destroyUser()
        console.log(res.data)
    }
    render() {

        return (
            !this.props.user.auth_id ?
                <>
                    <LoginButton onClick={this.login}>Log In</LoginButton>
                    <Signup onClick={this.login}>Sign Up</Signup>
                </> :
                <></>
        )
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, { addToUser, destroyUser })(LogFunctions);
const Signup = styled.div`
${blueButton()}
`
const LoginButton = styled.div`
white-space: nowrap;
margin-right: 8px;
border-radius: 3px;
color: ${linkBlue};
font-size: 13px;
padding: 8px 10px 8px 10px;
:hover{
    color: #005999;
    background-color: rgba(0,119,204,0.1);
    border-color: transparent;
    box-shadow: none;
    cursor: pointer;
}
`
