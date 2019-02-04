import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Layout from "../Layout/Layout1.jsx";
import {
  blueButton,
  Page,
  P,
  Adds,
  Content,
  LoadingWraper,
  TabButton,
  SearchBar,
  colors,
  H1
} from "../../utilites/index.js";

export default class TagsId extends Component {
  state = {
    loading: true,
    information: {}
  };

  componentDidMount = async () => {
    let res = await axios.post("/api/tags/tinytag", {
      subject: this.props.match.params.name
    })
    this.setState({ loading: false, information: res.data })
    console.log(this.state)
  }


  render() {
    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Page >
            <TagPage>
              <LargeTinyTag>
                <TagContent>
                  <H1>Questions tagged [{this.props.match.params.name}]</H1>
                  <Link to='/create-question'><AskButton>Ask Question</AskButton></Link>
                </TagContent>
                <Desc>{this.state.information.description}</Desc>
                <WatchBar>
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
                </WatchBar>
              </LargeTinyTag>
              <Searches>
                <QuestionIn>
                  1,323,434,322 questions
                </QuestionIn>
                <SortBar>
                  <ButtonContainer>
                    <TabButton
                      onClick={() => this.handleView("Info")}
                      active={this.state.view === "Info"}
                      activeNeigbor={this.state.view === "Info"}
                      position="left"
                    >
                      Info
                </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Newest")}
                      active={this.state.view === "Newest"}
                      activeNeigbor={this.state.view === "Newest"}
                      position="mid"
                    >
                      <FeaturedBox>Newest</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Name")}
                      active={this.state.view === "Name"}
                      activeNeigbor={this.state.view === "hot"}
                      position="mid"
                    >
                      <FeaturedBox>Featured</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Name")}
                      active={this.state.view === "Name"}
                      activeNeigbor={this.state.view === "hot"}
                      position="mid"
                    >
                      <FeaturedBox>Frequent</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Name")}
                      active={this.state.view === "Name"}
                      activeNeigbor={this.state.view === "hot"}
                      position="mid"
                    >
                      <FeaturedBox>Votes</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Name")}
                      active={this.state.view === "Name"}
                      activeNeigbor={this.state.view === "hot"}
                      position="mid"
                    >
                      <FeaturedBox>Active</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("New")}
                      active={this.state.view === "New"}
                      position="right"
                    >
                      Unanswered
                </TabButton>
                  </ButtonContainer>
                </SortBar>
              </Searches>
              <QuestionSection>
                <div>heyo</div>
              </QuestionSection>
            </TagPage>
            <Adds style={{ border: "1px red solid" }} />
          </Page>
        </LoadingWraper>
      </Layout>
    );
  }
}
const QuestionIn = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const SortBar = styled.div`
  display: flex;
  flex-flow:row;
  justify-content: space-between;
`;
const FeaturedBox = styled.div``;
const ButtonContainer = styled.div``;
const QuestionSection = styled.div`
`;
const LargeTinyTag = styled.div`
padding:24px;
padding-bottom: 0;
`;
const Searches = styled.div`
padding:24px;
display: flex;
justify-content: space-between;
width:100% + 48px;
border-bottom: 1px solid ${colors.borderGray};
`
const Desc = styled.div`
  margin-top: 15px;
  color: black;
`;
const WatchButton = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  padding: 10.5px;
  border: solid black 1px;
  margin-top: 15px;
  border-radius: 3px;
  margin-right: 15px;
`;
const IgnoreButton = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  padding: 10.5px;
  border: solid black 1px;
  margin-top: 15px;
  border-radius: 3px;
`;
const Text = styled.div`

`
const Path = styled.path`
  fill: currentColor;
`;
const WatchBar = styled.div`
display: flex;
height: fit-content;
`
const TagPage = styled(P)`
/* padding:24px; */
display:flex;
flex-flow:column;
`
const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;
const TagContent = styled(Content)`
max-height: 36px;
height: fit-content;
display: flex;
justify-content: space-between;
`