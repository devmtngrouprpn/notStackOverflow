import React, { Component } from "react";
import styled from "styled-components";
import Blog from "./SideBar/Blog";
import Ads from "./SideBar/Ads";
import TagsWatch from "./SideBar/TagsWatch";

class RightSideBar extends Component {
  render() {
    return (
      <>
        <SideBar>
          <Blog />
          <TagsWatch />
          <Ads />
        </SideBar>
      </>
    );
  }
}

const SideBar = styled.div`
  margin-top: 6.8%;
`;
export default RightSideBar;
