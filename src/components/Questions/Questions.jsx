import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import {
  flex,
  featuredBoxBlue,
  borderGray,
  blueButton,
  Page,
  Adds,
  Content,
  LoadingWraper,
  TabButton,
  H1,
  StyledLink
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_questions } from "../../ducks/questions";

class Questions extends Component {
  state = {
    view: "newest",
    loading: true
  };

  componentDidMount = async () => {
    await this.getQuestions();
  };

  getQuestions = async () => {
    let res = await axios.get(`/api/questions/world`);
    console.log(res.data);
    this.props.update_questions(res.data);
    this.setState({ loading: false });
  };

  handleView = name => {
    this.setState({ view: name });
  };

  render() {
    // let questions = this.props[this.state.view].map(question => (
    //   <HQCard question={question} />
    // ));

    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Page>
            <Content>
              <HeaderContainer>
                <H1>
                  {this.state.view.includes("unanswered")
                    ? "Unanswered Questions"
                    : "All Questions"}
                </H1>
                <StyledLink to="/create-question">
                  <AskButton>Ask Question</AskButton>
                </StyledLink>
              </HeaderContainer>
              <ButtonContainer>
                {!this.state.view.includes("unanswered") ? (
                  <>
                    <TabButton
                      onClick={() => this.handleView("newest")}
                      active={this.state.view === "newest"}
                      activeNeigbor={this.state.view === "featured"}
                      position="left"
                    >
                      Newest
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("featured")}
                      active={this.state.view === "featured"}
                      activeNeigbor={this.state.view === "frequent"}
                      position="mid"
                    >
                      <FeaturedBox>
                        <CountBox>{this.props.t}</CountBox>
                        Featured
                      </FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("frequent")}
                      active={this.state.view === "frequent"}
                      activeNeigbor={this.state.view === "votes"}
                      position="mid"
                    >
                      <FeaturedBox>Frequent</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("votes")}
                      active={this.state.view === "votes"}
                      activeNeigbor={this.state.view === "active"}
                      position="mid"
                    >
                      <FeaturedBox>Votes</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("active")}
                      active={this.state.view === "active"}
                      position="mid"
                    >
                      <FeaturedBox>Active</FeaturedBox>
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("unansweredMyTags")}
                      position="right"
                    >
                      unanswered
                    </TabButton>
                  </>
                ) : (
                  <>
                    <TabButton
                      onClick={() => this.handleView("unansweredMyTags")}
                      active={this.state.view === "unansweredMyTags"}
                      activeNeigbor={this.state.view === "unansweredNewest"}
                      position="left"
                    >
                      My Tags
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("unansweredNewest")}
                      active={this.state.view === "unansweredNewest"}
                      activeNeigbor={this.state.view === "unansweredVotes"}
                      position="mid"
                    >
                      Newest
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("unansweredVotes")}
                      active={this.state.view === "unansweredVotes"}
                      activeNeigbor={this.state.view === "unansweredNoAnswers"}
                      position="mid"
                    >
                      Votes
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("unansweredNoAnswers")}
                      active={this.state.view === "unansweredNoAnswers"}
                      position="mid"
                    >
                      No Answers
                    </TabButton>
                    <TabButton
                      onClick={() => this.handleView("newest")}
                      position="right"
                    >
                      all questions
                    </TabButton>
                  </>
                )}
              </ButtonContainer>
              <QuestionBox>{questions}</QuestionBox>
            </Content>
            <Adds style={{ border: "1px red solid" }} />
          </Page>
        </LoadingWraper>
      </Layout>
    );
  }
}

const QuestionBox = styled.div`
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
  let {
    newest,
    featured,
    frequent,
    votes,
    active,
    unanswered,
    unansweredNewest,
    unansweredMyTags,
    unansweredVotes,
    unansweredNoAnswer
  } = state.questions;
  return {
    newest,
    featured,
    frequent,
    votes,
    active,
    unanswered,
    unansweredNewest,
    unansweredMyTags,
    unansweredVotes,
    unansweredNoAnswer
  };
}
export default connect(
  mapStateToProps,
  { update_questions }
)(Questions);
