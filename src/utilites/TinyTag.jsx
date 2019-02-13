import React, { Component } from "react";
import { P } from "../utilites/globals.js";
import styled from "styled-components";
import { LoadingWraper } from "../utilites/index";
import axios from "axios";
import { debounce } from "lodash";
import { Link, Redirect, withRouter } from "react-router-dom";

class TinyTag extends Component {
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
  clickable = () => {
    if (!this.props.notClickable) {
<<<<<<< HEAD
      console.log("woah  there cowboy");
      this.props.history.push(`/tags/${this.props.subject}`);
=======
      console.log('woah  there cowboy')
      this.props.history.push(`/tags/${this.props.subject}`)
>>>>>>> master
    }
  };
  runCall = async () => {
    if (!this.state.information) {
      let res = await axios.post("/api/tags/tinytag", {
        subject: this.props.subject
      });
      this.setState({ information: res.data });
    }
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
      <>
        <Relative onMouseEnter={this.makeCall} onMouseLeave={this.leaving}>
          <Subject
            to={`/${this.state.information.subject}`}
            onClick={this.clickable}
          >
            {this.props.subject}
            {this.props.x ? (
              <SVG width="12" height="12" viewBox="0 0 14 14">
                <Path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z" />
              </SVG>
            ) : (
                <></>
              )}
            {this.state.stillWant && this.state.information ? (
              <WhiteSquare
                onMouseEnter={this.makeCall}
                onMouseLeave={this.leaving}
              />
            ) : (
                <></>
              )}
            {this.state.stillWant && this.state.information ? (
              <HoverSpace
                onMouseEnter={this.makeCall}
                onMouseLeave={this.leaving}
              >
                <DropDown>
                  <TitleSpan>
                    <Watcher>
                      <svg
                        aria-hidden="true"
                        class="svg-icon va-text-top iconFire"
                        width="18"
                        height="18"
                      // viewBox="0 0 18 18"
                      >
                        <Path d="M7.48.01c.87 2.4.44 3.74-.57 4.77-1.06 1.16-2.76 2.02-3.93 3.7C1.4 10.76 1.13 15.72 6.8 17c-2.38-1.28-2.9-5-.32-7.3-.66 2.24.57 3.67 2.1 3.16 1.5-.52 2.5.58 2.46 1.84-.02.86-.33 1.6-1.22 2A6.17 6.17 0 0 0 15 10.56c0-3.14-2.74-3.56-1.36-6.2-1.64.14-2.2 1.24-2.04 3.03.1 1.2-1.11 2-2.02 1.47-.73-.45-.72-1.31-.07-1.96 1.36-1.36 1.9-4.52-2.03-6.88L7.45 0l.03.01z" />
                      </svg>
                      <Text>
                        {" "}
                        {this.state.information.watchers} watcher
                        {this.state.information.watchers < 2 ? "" : "s"}
                      </Text>
                    </Watcher>
                    <Question>
                      {this.state.information.questions.replace(/[{()}]/g, "")}{" "}
                      question{this.state.information.watchers < 2 ? "" : "s"}
                    </Question>
                  </TitleSpan>
                  <Desc>
                    {this.state.information.description}{" "}
                    <Link to={`/tags/${this.state.information.tag_name}`}>
                      View Tag
                    </Link>
                  </Desc>
                  <ButtonHolder>
                    <WatchButton>
                      <svg
                        aria-hidden="true"
                        class="svg-icon iconEyeOff"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <Path d="M5.02 9.44l-2.22 2.2A14.46 14.46 0 0 1 1 9s3-6 8.06-6c.75 0 1.46.14 2.12.38L9.5 5.03a4.01 4.01 0 0 0-4.48 4.41zm.93 2.15a4 4 0 1 0 5.6-5.68l1.51-1.54A14.14 14.14 0 0 1 17 9s-3 6-7.94 6c-1.85 0-3.42-.8-4.68-1.82l1.57-1.59zm2.61-.64L3.6 16 2 14.41 14.59 2 16 3.41l-5.05 5.13a2 2 0 0 1-2.38 2.42z" />
                      </svg>
                      Watch Tag
                    </WatchButton>
                    {/* <UnWatchButton>SVG UnWatch Tag</UnWatchButton> */}
                    <IgnoreButton>
                      <svg
                        aria-hidden="true"
                        class="svg-icon iconNotInterested"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <Path d="M5.52 13.89a6 6 0 0 0 8.37-8.37L5.52 13.9zm-1.4-1.41l8.36-8.37a6 6 0 0 0-8.37 8.37zM9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16z" />
                      </svg>
                      Ignore Tag
                    </IgnoreButton>
                  </ButtonHolder>
                </DropDown>
              </HoverSpace>
            ) : (
                <></>
              )}
          </Subject>
        </Relative>
      </>
    );
  }
}
const SVG = styled.svg`
  position: relative;
  top: 1px;
  margin-left: 5px;
  :hover {
    fill: currentColor;
  }
`;

const Desc = styled.div`
  margin-top: 15px;
  color: black;
`;
const Question = styled.div`
  color: black;
`;
const Text = styled.span`
  position: relative;
  top: -3px;
`;
const WhiteSquare = styled.div`
  position: absolute;
  z-index: 3;
  background: white;
  border-top-left-radius: 2px;
  top: 25px;
  height: 12px;
  right: 50%;
  width: 12px;
  transform: rotate(45deg);
  border-top: 1px solid black;
  border-left: 1px solid black;
  transition: 1s;
  animation: 0.25s ease-in 0s 1 exist;
`;
const Path = styled.path`
  fill: currentColor;
`;
const Watcher = styled.div`
  color: orange;
`;
const ButtonHolder = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleSpan = styled.div`
  padding-right: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const WatchButton = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  padding: 10.5px;
  border: solid black 1px;
  /* margin: 5px; */
  margin-top: 15px;
  border-radius: 3px;
`;
const IgnoreButton = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  padding: 10.5px;
  border: solid black 1px;
  /* margin: 5px; */
  margin-top: 15px;
  border-radius: 3px;
`;
const Relative = styled.div`
  position: relative;
  min-width: 12px;
  width: min-content;
  margin: 2px;
`;
const HoverSpace = styled.div`
  z-index: 2;

  position: absolute;
  right: -140px;
  top: 16px;
  height: 40px;
  width: 360px;
`;
let DropDown = styled.div`
  box-sizing: border-box;
  top: 10px;
  margin: 5px;
  padding: 12px 15px 12px 15px;
  box-shadow: 0px 2px 5px 1px lightgray;
  border-radius: 3px;
  white-space: pre-wrap;

  background: white;
  position: absolute;
  max-height: 290px;
  width: 348px;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-content: center;
  align-items: center;
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

export default withRouter(TinyTag);
