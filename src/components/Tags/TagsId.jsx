import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTags } from "../../ducks/tags.js";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout1.jsx";
import {
  blueButton,
  Page,
  P,
  Adds,
  Content,
  LoadingWraper,
  TabButton,
  flex,
  featuredBoxBlue,
  colors,
  H1
} from "../../utilites/index.js";
import VQcard from "../Questions/VQCard.jsx";

class TagsId extends Component {
  state = {
    view: "active",
    loading: true
  };

  componentDidMount = async () => {
    let res = await axios.get(
      `/api/tags/indv?tag_name=${this.props.match.params.name}`
    );
    this.props.setTags(res.data);
    this.setState({ loading: false });
  };

  handleView = name => {
    this.setState({ view: name });
  };

  render() {
    console.log(this.props);
    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Page>
            <TagPage>
              <LargeTinyTag>
                <TagContent>
                  <H1>Questions tagged [{this.props.match.params.name}]</H1>
                  <Link to="/create-question">
                    <AskButton>Ask Question</AskButton>
                  </Link>
                </TagContent>
                <Desc>{this.props.description}</Desc>
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
                  {this.props[`${this.state.view}_total`] || 0} question
                  {this.props[`${this.state.view}_total`] == 1 ? "" : "s"}
                </QuestionIn>
                <SortBar>
                  {!this.state.view.includes("unanswered") ? (
                    <ButtonContainer>
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
                          <CountBox>{this.props.featured_total}</CountBox>
                          Featured
                        </FeaturedBox>
                      </TabButton>
                      <TabButton
                        onClick={() => this.handleView("frequent")}
                        active={this.state.view === "frequent"}
                        activeNeigbor={this.state.view === "votes"}
                        position="mid"
                      >
                        Frequent
                      </TabButton>
                      <TabButton
                        onClick={() => this.handleView("votes")}
                        active={this.state.view === "votes"}
                        activeNeigbor={this.state.view === "active"}
                        position="mid"
                      >
                        Votes
                      </TabButton>
                      <TabButton
                        onClick={() => this.handleView("active")}
                        active={this.state.view === "active"}
                        position="mid"
                      >
                        Active
                      </TabButton>
                      <TabButton
                        onClick={() => this.handleView("unansweredNewest")}
                        position="right"
                      >
                        Unanswered
                      </TabButton>
                    </ButtonContainer>
                  ) : (
                    <ButtonContainer>
                      <TabButton
                        onClick={() => this.handleView("unansweredNewest")}
                        active={this.state.view === "unansweredNewest"}
                        activeNeigbor={this.state.view === "unansweredVotes"}
                        position="left"
                      >
                        Newest
                      </TabButton>
                      <TabButton
                        onClick={() => this.handleView("unansweredVotes")}
                        active={this.state.view === "unansweredVotes"}
                        activeNeigbor={
                          this.state.view === "unansweredNoAnswers"
                        }
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
                        onClick={() => this.handleView("active")}
                        position="right"
                      >
                        all questions
                      </TabButton>
                    </ButtonContainer>
                  )}
                </SortBar>
              </Searches>
              <QuestionSection>
                {(this.props[this.state.view] || []).map(question => (
                  <VQcard question={question} />
                ))}
              </QuestionSection>
            </TagPage>
            <Adds style={{ border: "1px red solid" }} />
          </Page>
        </LoadingWraper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const {
    active,
    frequent,
    featured,
    newest,
    votes,
    unansweredNewest,
    unansweredVotes,
    unansweredNoAnswer,
    frequent_total,
    featured_total,
    active_total,
    votes_total,
    newest_total,
    unansweredNewest_total,
    unansweredNoAnswer_total,
    unansweredVotes_total,
    description
  } = state.tags;
  return {
    active,
    frequent,
    featured,
    newest,
    votes,
    unansweredNewest,
    unansweredVotes,
    unansweredNoAnswer,
    frequent_total,
    featured_total,
    active_total,
    votes_total,
    newest_total,
    unansweredNewest_total,
    unansweredNoAnswer_total,
    unansweredVotes_total,
    description
  };
}

export default connect(
  mapStateToProps,
  { setTags }
)(TagsId);
const ButtonContainer = styled.div`
  ${flex("row", "flex-end")}
`;
const QuestionIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SortBar = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
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
const QuestionSection = styled.div``;
const LargeTinyTag = styled.div`
  padding: 24px;
  padding-bottom: 0;
`;
const Searches = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  width: 100% + 48px;
  border-bottom: 1px solid ${colors.borderGray};
`;
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
const Text = styled.div``;
const Path = styled.path`
  fill: currentColor;
`;
const WatchBar = styled.div`
  display: flex;
  height: fit-content;
`;
const TagPage = styled(P)`
  /* padding:24px; */
  display: flex;
  flex-flow: column;
`;
const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;
const TagContent = styled(Content)`
  max-height: 36px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;
