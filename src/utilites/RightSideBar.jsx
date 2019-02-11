import React, { Component } from "react";
import styled from "styled-components";
import BusinessType from "./../assets/BusinessType.svg";
import People from "./../assets/People.svg";
import Money from "./../assets/Money.svg";
import Healing from "./../assets/Healing.svg";
import Train from "./../assets/Train.svg";
import Weight from "./../assets/Weight.svg";
import Child from "./../assets/Child.svg";
import LocationPing from "./../assets/Location.svg";
import { TinyTag, Logo } from "./index";
import Blog from "./SideBar/Blog";
import Ads from "./SideBar/Ads";

class RightSideBar extends Component {
  render() {
    return (
      <>
        <SideBar>
          <Blog />
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
