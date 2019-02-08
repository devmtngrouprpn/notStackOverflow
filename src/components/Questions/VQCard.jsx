import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  P,
  hrGray,
  flex,
  tenKViews,
  oneKViews,
  TinyTag,
  green,
  questionBoxGray,
  H1,
  StyledLink,
  textLightGray,
  timeFunction
} from "./../../utilites/index";
import UserTag from "./../../utilites/UserTag";

function VQCard({ question, user }) {
  let difference = timeFunction(question.question_creation_timestamp);
  const tags = question.tags.map(tag => <TinyTag subject={tag} />);
  let userTagbe = false;
  const userTag = () => {
    if (user.tags_watching) {
      let userTags = user.tags_watching.map(tag => question.tags.includes(tag));
      if (userTags.includes(true)) {
        userTagbe = true;
      }
    }
  };
  userTag();
  return (
    <>
      <Card tag={userTagbe}>
        <Data>
          <Container to={`/questions/${question.question_id}`}>
            <BigP>{question.votes ? question.votes : 0}</BigP>
            <SmallP>vote{question.votes != 1 ? "s" : ""}</SmallP>
          </Container>
          <AnswerBox
            answers={question.answers}
            accepted={question.answer_accepted}
            to={`/questions/${question.question_id}`}
          >
            <BigP answers={true}>{question.answers}</BigP>
            <SmallP answers={true}>
              answer{question.answers != 1 ? "s" : ""}
            </SmallP>
          </AnswerBox>
          <Container to={`/questions/${question.question_id}`}>
            <ViewsP views={question.question_views} big={true}>
              {question.question_views > 1000
                ? `${(question.question_views / 1000).toFixed(0)}k`
                : question.question_views}{" "}
              view{question.question_views != 1 ? "s" : ""}
            </ViewsP>
          </Container>
        </Data>
        <RightContainer>
          <BiggerBox>
            <QuestionH1>
              <StyledCardLink to={`/questions/${question.question_id}`}>
                {question.bounty_value ? (
                  <BountyAmount>+ {question.bounty_value}</BountyAmount>
                ) : null}

                {question.question_title}
              </StyledCardLink>
            </QuestionH1>
            <QuestionH3>{question.content.substr(0, 150)}</QuestionH3>
            <TagContainer>{tags}</TagContainer>
            <br />
          </BiggerBox>
          <SmallerBox />
          <NameP>
            <UserTag question={question} user={user} />
          </NameP>
        </RightContainer>
      </Card>
      <Hr />
    </>
  );
}

const QuestionH1 = styled(H1)`
  font-size: 16px;
  margin-bottom: 5.25px;
`;
const QuestionH3 = styled(P)`
  font-size: 100%;
  margin-bottom: 5.25px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0;
  padding-bottom: 5px;
  margin: 0;
  color: #777f87;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const RepP = styled(P)`
  font-weight: bold;
  font-size: 12px;
  margin-right: 2px;
  color: #848d95;
`;

const RightContainer = styled.div`
  flex-basis: 100%;
  position: relative;
  margin: 0;
  height: 100%;
`;

const AskedLink = styled(StyledLink)`
  color: #9199a1;
  font-size: 12px;
  margin-right: 5px;
  :hover {
    color: #07c;
  }
  margin-bottom: 2px;
`;

const NameP = styled(P)`
  box-sizing: border-box;
  padding: 5px 6px 7px 7px;
  width: 200px;
  float: right;
`;

const ProPic = styled.img`
  border-radius: 1.5px;
  width: 32px;
  height: 32px;
  margin: 0;
  -webkit-box-shadow: 0px 3px 25px 1px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 0px 3px 25px 1px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 3px 25px 1px rgba(0, 0, 0, 0.32);
`;

const UserInfo = styled(P)`
  display: flex;
  flex-direction: row;
`;

const SmallerBox = styled.div`
  /* ${flex("column", "flex-start", "flex-start")} */

`;
const Bronze = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: brown;
  font-weight: 550;
  padding-left: 8px;
  display: flex;
  padding-right: 2.5px;
`;
const Silver = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: silver;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;
const Gold = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: gold;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;
const BiggerBox = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 100%;
  position: relative;
  margin: 0;
`;
const UserName = styled(P)`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const UserBadges = styled(P)`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  /* margin-left: 8px; */
`;

const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  font-weight: 400;
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;

const Card = styled.div`
  padding: 12px 8px;
  height: auto;
  ${flex("row", "flex-start", "flex-start")};
  padding-left: 8px;
  background-color: ${props => (props.tag ? "#fffbec" : "inherit")};
  float: none;
`;

const Data = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  margin-right: 16px;
  width: 58px;
  float: none;
  margin-left: 8px;
  flex-shrink: 0;
  color: #6a737c;
  font-size: 11px;
`;
const BigP = styled(P)`
  color: ${props => (props.answers ? "inherit" : questionBoxGray)};
  font-size: 20px;
`;

const SmallP = styled.div`
  color: ${props => (props.answers ? "inherit" : questionBoxGray)};

  font-size: 12px;
`;

const AnswerBox = styled(StyledLink)`
  ${flex("column")}
  height: 52px;
  width: 58px;
  border: 1px solid ${props => (props.answers >= 1 ? green : "transparent")};
  border-radius: 3px;
  padding: 6px;
  color: ${props =>
    props.accepted ? "#fff" : props.answers >= 1 ? green : questionBoxGray};
  background-color: ${props => (props.accepted ? green : "transparent")};
`;

const ViewsP = styled(P)`
  color: ${props =>
    +props.views >= 10000
      ? tenKViews
      : +props.views >= 1000
      ? oneKViews
      : questionBoxGray};
  font-size: ${props => (props.big ? "13px" : "11px")};
  ${flex("row")}
  padding: 0;
`;

const TagContainer = styled.div`
  ${flex()}
`;
const BadgeP = styled.p`
  font-weight: 400;
  font-size: 12px;
  padding-left: 0;
  color: #6a737c;
`;
const Container = styled(StyledLink)`
  ${flex("column")}
  padding: 7px;
  height: 52px;
  width: 52px;
`;

const Hr = styled.div`
  border: 0.5px solid ${hrGray};
`;
const BountyAmount = styled.div`
  float: left;
  color: #fff;
  font-size: 11px;
  padding: 0.2em 0.5em 0.25em;
  line-height: 1.3;
  background-color: #0077dd;
  margin-right: 5px;
  border-radius: 2px;
`;
function mapStateToProps(state) {
  let { user } = state.global;
  return {
    user
  };
}
export default connect(mapStateToProps)(VQCard);
