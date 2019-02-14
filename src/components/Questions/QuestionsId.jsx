import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Layout from "../Layout/Layout1.jsx";
import Answer from "./Answer";
import { Link } from "react-router-dom";
import AnswerCreator from "./AnswerCreator";
import UserTag from "../../utilites/UserTag";
import ArrowColumn from "../../utilites/ArrowColumn";
import CommentSection from "./CommentSection";
import ReactHtmlParser from "react-html-parser";
import Ads from "./../../utilites/RightSideBar";
import {
  Page,
  Adds,
  P,
  Content,
  LoadingWraper,
  H1,
  borderGray,
  flex,
  blueButton,
  TinyTag,
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
    acceptShow: false
  };
  componentDidMount = async () => {
    const res = await axios.get(
      `/api/question/indv?id=${this.props.match.params.id}`
    );
    let accept = false;
    if (res.data.user_id === this.props.auth_id && res.data.answer_accepted) {
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

  render() {
    let { question } = this.state;
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
                  <Posted>
                    viewed <Viewed>{question.question_views} times</Viewed>
                  </Posted>
                </AskedInfo>
                <Adds>
                  {" "}
                  <Ads />{" "}
                </Adds>
              </AddsColumn>
            </QuestionPage>
          </Box>
        </LoadingWraper>
        <Adds>
          <Ads />
        </Adds>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { auth_id } = state.users;
  return {
    auth_id
  };
}

export default connect(mapStateToProps)(QuestionId);

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
const Posted = styled.span`
  margin: 15px 0px 5px 16px;
  color: #9199a1;
  font-size: 14px;
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
