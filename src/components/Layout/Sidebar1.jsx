import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { flex, colors, P, StyledLink } from "../../utilites/index.js";
import axios from 'axios'

function Sidebar({ match }) {
  const route = (match.path.match(/(\w+)$/) || ["home"])[0];
  function getHome() {
    // let auth_id = 'user1'
    let res = axios.get(`/api/questions/interesting`);
    console.log(res);
  }
  return (
    <SidebarContainer>
      <SidebarLink to="/" active={route === "home"}>
        <SidebarP indent="8px">Home</SidebarP>
      </SidebarLink>

      <SidebarP indent="8px" margin="15px 0 10px 0" fontSize="11px">
        PUBLIC
      </SidebarP>

      <SidebarLink indent="8px" to="/questions" active={route === "questions"}>
        <svg
          aria-hidden="true"
          class="svg-icon iconGlobe"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <Path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zM8 15.32a6.4 6.4 0 0 1-5.23-7.75L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.4 6.4 0 0 1 2.32 10.24z" />
        </svg>
        <SidebarP margin="0 0 0 3px">Not Stack Overflow</SidebarP>
      </SidebarLink>

      <SidebarLink indent="28px" to="/tags" active={route === "tags"}>
        <SidebarP>Tags</SidebarP>
      </SidebarLink>

      <SidebarLink indent="28px" to="/users" active={route === "users"}>
        <SidebarP>Users</SidebarP>
      </SidebarLink>
      <button onClick={getHome}>Here Boi</button>
    </SidebarContainer>
  );
}

const Path = styled.path`
  fill: currentColor;
`;

const SidebarContainer = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  padding-left: 8px;
  padding-top: 20px;
  border-right: 1px solid ${colors.borderGray};
  min-height: calc(100vh - 50px);
  position: fixed;
  top: 50px;
`;

const SidebarLink = styled(StyledLink)`
  height: 35px;
  width: 155px;
  vertical-align: center;
  font-size: 13px;
  font-weight: ${props => (props.active ? "bold" : "400px")};
  color: ${props => (props.active ? colors.black : "")};
  padding-left: ${props => props.indent || "0"};
  background: ${props => (props.active ? colors.darkOffWhite : "")};
  border-right: ${props => (props.active ? `solid ${colors.orange} 3px` : "")};
  ${flex("row", "flex-start")};
`;

const SidebarP = styled(P)`
  vertical-align: center;
  font-size: ${props => props.fontSize || "13px"};
  margin: ${props => props.margin || "0 0 0 0"};
  color: ${colors.textDarkGray};
  padding-left: ${props => props.indent || "0"};
`;

export default withRouter(Sidebar);
