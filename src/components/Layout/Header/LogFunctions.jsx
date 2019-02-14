import React, { Component } from "react";
import axios from "axios";
import { blueButton } from "../../../utilites/globals.js";
import { linkBlue, P } from "../../../utilites";
import styled from "styled-components";
import { addToUser, destroyUser } from "../../../ducks/global";
import { connect } from "react-redux";

class LogFunctions extends Component {
  state = {};
  async componentDidMount() {
    let res = await axios.post("/api/user-data", { type: "login" });
    this.props.addToUser(res.data);
  }
  login = () => {
    const {
      REACT_APP_DOMAIN,
      REACT_APP_CLIENT_ID,
      REACT_APP_LOGIN
    } = process.env;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${REACT_APP_LOGIN}&response_type=code`;
  };
  logout = async () => {
    let res = await axios.post("/api/user-data", { type: "logout" });
    this.props.destroyUser();
  };
  render() {
    return !this.props.user.auth_id ? (
      <>
        <LoginButton onClick={this.login}>
          <P>Log In</P>
        </LoginButton>
        <Signup onClick={this.login}>
          <P>Sign Up</P>
        </Signup>
      </>
    ) : (
      <></>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.global;
  return {
    user
  };
}
export default connect(
  mapStateToProps,
  { addToUser, destroyUser }
)(LogFunctions);
const Signup = styled.div`
  ${blueButton()}
`;
const LoginButton = styled.div`
  white-space: nowrap;
  margin-right: 8px;
  border-radius: 3px;
  color: ${linkBlue};
  font-size: 13px;
  padding: 8px 10px 8px 10px;
  :hover {
    color: #005999;
    background-color: rgba(0, 119, 204, 0.1);
    border-color: transparent;
    box-shadow: none;
    cursor: pointer;
  }
`;
