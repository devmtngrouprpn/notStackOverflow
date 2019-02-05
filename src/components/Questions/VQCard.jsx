import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
  textLightGray
} from "./../../utilites/index";

function HQCard({ question }) {
  console.log(question);
  const tags = question.tags.map(tag => <TinyTag subject={tag} />);
  return (
    <>
      <Card>
        <Data>
          <Container to={`/questions/${question.question_id}`}>
            <BigP>{question.votes}</BigP>
            <SmallP>vote{question.votes != 1 ? "s" : ""}</SmallP>
            {/* <p>Hello</p> */}
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
            <ViewsP big={true} views={question.question_views}>
              {question.question_views > 1000
                ? `${(question.question_views / 1000).toFixed(0)}k`
                : question.question_views}
            </ViewsP>
            <ViewsP views={question.question_views}>
              view{question.question_views != 1 ? "s" : ""}
            </ViewsP>
          </Container>
        </Data>
        <RightContainer>
          <QuestionH1>
            <StyledCardLink to={`/questions/${question.question_id}`}>
              {question.question_title}
            </StyledCardLink>
          </QuestionH1>
          <QuestionH3>{question.content}</QuestionH3>
          <TagContainer>{tags}</TagContainer>
          <NameP>
            <AskedLink to={`/questions/${question.question_id}`}>
              asked in the past
            </AskedLink>
            <StyledCardLink user={true} to={`/users/${question.username}`}>
              <P>{question.username}</P>
            </StyledCardLink>{" "}
            <RepP>
              {question.reputation > 1000
                ? `${(question.reputation / 1000).toFixed(1)}k`
                : question.reputation}
            </RepP>
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
const QuestionH3 = styled(H1)`
  font-size: 16px;
  margin-bottom: 5.25px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0;
  padding-bottom: 5px;
  margin: 0;
  color: #3b4045;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const RepP = styled(P)`
  font-weight: 700;
  color: #848d95;
`;

const RightContainer = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 100%;
  position: relative;
  margin: 0;
`;

const AskedLink = styled(StyledLink)`
  color: #9199a1;
  font-size: 12px;
  margin-right: 5px;
  :hover {
    color: #07c;
  }
`;

const NameP = styled(P)`
  align-self: flex-end;
  position: absolute;
  font-size: 12px;
  bottom: 10px;
  width: 200px;
  line-height: 18px;
  ${flex()}
`;

const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;

const Card = styled.div`
  padding: 12px 8px;
  ${flex("row", "flex-start", "flex-start")}
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
  font-size: 17px;
`;

const SmallP = styled.div`
  color: ${props => (props.answers ? "inherit" : questionBoxGray)};

  font-size: 11px;
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
  font-size: ${props => (props.big ? "17px" : "11px")};
`;

const TagContainer = styled.div`
  ${flex()}
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

export default HQCard;
