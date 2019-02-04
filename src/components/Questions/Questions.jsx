import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import {
  flex,
  featuredBoxBlue,
  borderGray,
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
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_home } from "./../../ducks/questions";

class Home extends Component {
  state = {
    view: "interesting",
    loading: false
  };
  componentDidMount() {
    this.getQuestions();
  }
  async getQuestions() {
    let res = await axios.get(`/api/questions/world`);
    this.props.update_home(res.data);
    this.setState({ loading: false });
    // console.log(res.data);
  }
  handleView = name => {
    this.setState({ view: name });
  };
  render() {
    let questions = this.props[this.state.view].map(question => (
      <HQCard question={question} />
    ));

    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Page >
            <TagPage>
              <LargeTinyTag>
                <TagContent>
                  <H1>All Questions</H1>
                  <Link to='/create-question'><AskButton>Ask Question</AskButton></Link>
                </TagContent>
              </LargeTinyTag>
              <Searches>
                <QuestionIn>
                  17,323,434,322 questions
                </QuestionIn>
                <SortBar>
                  <ButtonContainer>
                    <TabButton
                      onClick={() => this.handleView("Info")}
                      active={this.state.view === "Info"}
                      activeNeigbor={this.state.view === "Info"}
                      position="left"
                    >
                      Newest
                </TabButton>
                    <TabButton
                      onClick={() => this.handleView("Newest")}
                      active={this.state.view === "Newest"}
                      activeNeigbor={this.state.view === "Newest"}
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
        display:flex;
        flex-flow:column;
        `
const TagContent = styled(Content)`
        max-height: 36px;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        `
const Questions = styled.div`
  border-top: 1px solid ${borderGray};
      `;

const HeaderContainer = styled.div`
  ${flex("row", "space-between", "flex-start")}
        margin: 24px;
        max-width: 727px;
      `;

const ButtonContainer = styled.div`
  ${flex("row", "flex-end")}
        margin: 0 24px 24px 16px;
      `;

const FeaturedBox = styled.div`
  ${flex()}
        height: 15px;
      `;

const CountBox = styled.div`
        padding: 2px 5px 2.5px 5px;
  background-color: ${featuredBoxBlue};
        color: #fff;
        font-size: 10px;
        line-height: 10px;
        border-radius: 3px;
        margin-right: 5px;
        margin-left: -2px;
        position: relative;
        top: 1px;
      `;

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
        `;

function mapStateToProps(state) {
  let { interesting, featured, hot, week, month, tfeatured } = state.home;
  return {
    interesting,
    featured,
    hot,
    week,
    month,
    tfeatured
  };
}
export default connect(
  mapStateToProps,
  { update_home }
)(Home);
