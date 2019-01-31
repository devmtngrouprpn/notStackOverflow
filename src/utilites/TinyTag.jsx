import React, { Component } from "react";
import { P } from "../utilites/globals.js";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";
export default class TinyTag extends Component {
  constructor() {
    super();
    this.state = {
      information: false,
      hovering: false,
      bounce: debounce(this.runCall, 300, {
        leading: false,
        trailing: true
      }),
      stilWant: false
    };
  }
  runCall = async () => {
    let res = await axios.post("/api/tags/tinytag", {
      subject: this.props.subject
    });
    console.log(res.data);
    this.setState({ information: res.data });
  };
  makeCall = async () => {
    await this.setState({ hovering: true, stillWant: true });
    this.state.bounce();
  };
  leaving = () => {
    this.setState({ information: false, hovering: false, stillWant: false });
  };
  render() {
    if (!this.state.hovering) {
      this.state.bounce.cancel();
    }
    return (
      <Relative>
        <Subject onMouseEnter={this.makeCall} onMouseLeave={this.leaving}>
          {this.props.subject}
          {this.state.stillWant && this.state.information ? (
            <DropDown
            // onMouseEnter={() => { this.setState({ show: true }) }}
            // onMouseLeave={() => { this.setState({ show: false }) }}
            >
              {this.state.information.name} views:{" "}
              {this.state.information.tag_views} desc:{" "}
              {this.state.information.description}
            </DropDown>
          ) : (
            <></>
          )}
        </Subject>
      </Relative>
    );
  }
}
const Relative = styled.div`
  position: relative;
`;
let DropDown = styled(P)`
  white-space: pre-wrap;
  z-index: 2;
  left: 1px;
  top: 24px;
  background: white;
  position: absolute;
  height: 200px;
  width: 400px;
  border: 1px solid black;
  transition: 1s;
  animation: 0.25s ease-in 0s 1 exist;

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes exist {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Subject = styled(P)`
  white-space: nowrap;
  font-size: 14px;
  border-radius: 3px;
  padding: 5px 6px 5px 6px;
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
  width: fit-content;
  transition: 0.25s;
  margin: 2px 2px 2px 0;
  :hover {
    color: #33658a;
    background-color: #cee0ed;
    border-color: #cee0ed;

    cursor: pointer;
  }
`;
