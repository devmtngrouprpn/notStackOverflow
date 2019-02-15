import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToUser } from "../../ducks/global.js";
import Layout from "../Layout/Layout1.jsx";
import Answer from "./Answer";
import { Link } from "react-router-dom";
import AnswerCreator from "./AnswerCreator";
import UserTag from "../../utilites/UserTag";
import ArrowColumn from "../../utilites/ArrowColumn";
import CommentSection from "./CommentSection";
import ReactHtmlParser from "react-html-parser";
import {
  Page,
  Adds,
  P,
  Content,
  LoadingWraper,
  H1,
  borderGray,
  flex,
  timeFunction,
  black,
  blueButton,
  TinyTag,
  SearchBar,
  ads
} from "../../utilites/index.js";
import axios from "axios";
import Ads from "../../utilites/SideBar/Ads.jsx";

class QuestionId extends Component {
  state = {
    loading: true,
    question: {
      answers: [],
      question_content: "",
      question_title: "",
      tags: [],
      question_creation_timestamp: "T"
    },
    acceptShow: false,
    bountyInput: "50",
    areYouSure: ""
  };
  componentDidMount = async () => {
    const res = await axios.get(
      `/api/question/indv?id=${this.props.match.params.id}`
    );
    let accept = false;
    if (
      res.data.user_id === this.props.user.auth_id &&
      res.data.answer_accepted
    ) {
      accept = true;
    }
    this.setState({ loading: false, question: res.data, acceptShow: accept });
  };

  reMount = async () => {
    const res = await axios.get(
      `/api/question/indv?id=${this.props.match.params.id}`
    );
    this.setState({ loading: false, question: res.data });
  };

  getUser = async () => {
    const res = await axios.get(
      `/api/user/indv?user_id=${this.props.user.auth_id}`
    );
    console.log(res.data);
    this.props.addToUser(res.data.basicData[0]);
  };

  handleBounty = event => {
    let { value } = event.target;
    console.log(typeof this.props.user.reputation);
    console.log(typeof value);
    if (+value < +this.props.user.reputation) {
      this.setState({ bountyInput: value });
    }
  };

  setSure = event => {
    this.setState({ areYouSure: event.target.name });
  };

  setBounty = async event => {
    await axios.post("/api/bounty", {
      bounty_value: this.state.bountyInput,
      question_id: this.state.question.question_id,
      user_id: this.props.user.auth_id
    });
    this.setState({ areYouSure: "" });
    this.reMount();
    this.getUser();
  };

  render() {
    let { question } = this.state;
    console.log(question);
    // let message = question.question_content.replace(/^"'/, '').replace(/'"$/, '');
    // let messageCopy = message.split(`'`)
    // let formatedhtml = messageCopy.slice(1, messageCopy.length - 1).join('').replace(/,,/g, `'`)
    // let newHtml = question.question_content.replace(/^"'/, '').replace(/'"$/, '').split(`'`)
    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Box>
            <TopAdds />
            <TitleBox>
              <H1>{question.question_title}</H1>
              <Link to="/create-question">
                <AskButton>Ask Question</AskButton>
              </Link>
            </TitleBox>
            <QuestionPage>
              <Content>
                <Section>
                  <ArrowColumn
                    owner={question.user_id}
                    favnum={question.favorites}
                    reset={this.reMount}
                    id={question.question_id}
                    type={"question"}
                    stars={question.favorites}
                    votes={question.votes}
                    acceptShow={this.state.acceptShow}
                  />
                  <QuestionContent>
                    {ReactHtmlParser(question.question_content)}
                    <QuestionTags>
                      {question.tags.map(e => {
                        return <TinyTag subject={e} />;
                      })}
                    </QuestionTags>
                    <ShareEditUser>
                      <Edit to={`/edit/question/${question.question_id}`}>
                        edit
                      </Edit>
                      <QuestionUserTag question={question} />
                    </ShareEditUser>
                    <CommentSection
                      reset={this.reMount}
                      comments={question.comments}
                      reMount={this.reMount}
                      type={"question"}
                      id={question.question_id}
                    />
                  </QuestionContent>
                </Section>
                {question.answers !== null ? (
                  <Section3>
                    <TotalAnswers>
                      {" "}
                      {`Answers ${question.answers.length}`}
                    </TotalAnswers>
                    {question.answers.map(e => {
                      return <Answer id={e} />;
                    })}
                  </Section3>
                ) : (
                  <></>
                )}

                <Section2>
                  <AnswerCreator
                    reMount={this.reMount}
                    questionId={question.question_id}
                  />
                </Section2>
                {this.state.areYouSure === "true" ? (
                  <BountyContainer
                    activeBounty={!this.state.question.active_bounty}
                    rep={this.props.user.reputation}
                  >
                    <AskButton onClick={this.setBounty}>Sure</AskButton>
                    <AskButton onClick={this.setSure}>Not Sure</AskButton>
                  </BountyContainer>
                ) : (
                  <BountyContainer
                    activeBounty={!this.state.question.active_bounty}
                    rep={this.props.user.reputation}
                  >
                    <AskButton name="true" onClick={this.setSure}>
                      Place Bounty
                    </AskButton>
                    <BountyCounter
                      onChange={this.handleBounty}
                      type="number"
                      step="50"
                      max="500"
                      min="50"
                      value={this.state.bountyInput}
                    />
                  </BountyContainer>
                )}
              </Content>
              <AddsColumn>
                <AskedInfo>
                  <Posted>
                    asked{" "}
                    <Asked>
                      {timeFunction(
                        question.question_creation_timestamp
                      ).replace(/asked/g, "")}
                    </Asked>
                  </Posted>
                  <Posted2>
                    viewed <Viewed>{question.question_views} times</Viewed>
                  </Posted2>
                  <Adds>
                    <Ads />
                  </Adds>
                </AskedInfo>
              </AddsColumn>
            </QuestionPage>
          </Box>
        </LoadingWraper>
      </Layout>
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
  { addToUser }
)(QuestionId);
const Posted = styled.span`
  margin: 15px 0px 5px 16px;
  color: #9199a1;
  font-size: 14px;
`;
const Posted2 = styled(Posted)`
  margin-bottom: 15px;
`;

const BountyCounter = styled(SearchBar)`
  padding: 12px;
  flex-basis: 50px;
  margin-right: 15px;
`;

const BountyContainer = styled.div`
  ${flex("row", "flex-end", "flex-end")}
  width: 100%;
  margin-left: 4.5px;
  display: ${props =>
    props.rep > 50 && props.activeBounty ? "block" : "none"};
`;

const Asked = styled.span`
  color: ${black};
  margin-left: 14px;
`;

const Viewed = styled.span`
  color: ${black};
  margin-left: 8px;
`;

const Edit = styled(Link)``;
const TotalAnswers = styled(P)`
  width: 100%;
  border-bottom: 1px solid ${borderGray};
  padding-bottom: 25px;
  font-size: 18px;
  font-weight: 400;
`;
const QuestionUserTag = styled(UserTag)`
  height: 50px;
  width: 50px;
  background: blue;
  border: 1px black solid;
  padding: 30px;
`;

const ShareEditUser = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AskedInfo = styled.div`
  margin-bottom: 15px;
  ${flex("column", "flex-start", "flex-start")}
`;
const AddsColumn = styled.div`
  width: 100%;
`;
const QuestionTags = styled.div`
  display: flex;
`;
const QuestionContent = styled.div`
  font-family: Helvetica, sans-serif;
`;
const Section = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 25px 5px 25px 5px;
  border-bottom: 1px solid ${borderGray};
  height: fit-content;
  width: 750px;
`;
const Section2 = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 25px 5px 25px 5px;
  height: fit-content;
  width: 750px;
`;
const Section3 = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin: 25px 5px 25px 5px;
  height: fit-content;
  width: 750px;
`;
const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const TitleBox = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin: 0 24px;
  width: calc(100% - 48px);
`;

const Box = styled(P)`
  /* ${flex("column")} */
        /* flex-basis: 1100px; */
        /* overflow: visible; */
        height: fit-content;
        width:100%;
      `;

const TopAdds = styled.div`
  height: 90px;
  width: calc(100% - 48px);
  margin: 24px;
`;

const QuestionPage = styled(Page)`
  border-top: 1px solid ${borderGray};
  margin: 13px 24px 24px 24px;
  width: calc(100% - 48px);
  height: fit-content;
`;
