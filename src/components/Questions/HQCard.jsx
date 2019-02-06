import React from "react";
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
  featuredBoxBlue
} from "./../../utilites/index";

function HQCard({ question }) {
  let tags;
  if (question.tags) {
    tags = question.tags.map(tag => <TinyTag subject={tag} />);
  } else {
    tags = [];
  }
  return (
    <>
      <Card>
        <Data>
          <Container to={`/questions/${question.question_id}`}>
            <BigP>{question.votes || 0}</BigP>
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
              <BountyValue>
                {question.bounty_value ? (
                  <CountBox>+{question.bounty_value}</CountBox>
                ) : (
                  ""
                )}
                {question.question_title}
              </BountyValue>
            </StyledCardLink>
          </QuestionH1>
          <TagContainer>{tags}</TagContainer>
          <NameP>
            <AskedLink to={`/questions/${question.question_id}`}>
              asked in the past
            </AskedLink>
            <StyledCardLink user={true} to={`/users/${question.user_id}`}>
              <P>{question.username}</P>
            </StyledCardLink>{" "}
            <RepP>
              {question.reputation > 10000
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

const BountyValue = styled.div`
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

const QuestionH1 = styled(H1)`
  font-size: 16px;
  margin-bottom: 5.25px;
`;

const RepP = styled(P)`
  font-weight: 700;
  color: #848d95;
`;

const RightContainer = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 100%;
  position: relative;
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
  ${flex("row", "flex-start", "flex-start")}
  margin-right: 16px;
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
