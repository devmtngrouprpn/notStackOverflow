import React from "react";
import styled from "styled-components";
import {
  P,
  hrGray,
  flex,
  tenKViews,
  oneKViews,
  black,
  TinyTag,
  green
} from "./../../utilites/index";

function HQCard({ question }) {
  console.log(question);
  const tags = question.tags.map(tag => <TinyTag subject={tag} />);
  return (
    <>
      <Data>
        <AnswerBox
          answers={question.answers}
          accepted={question.answer_accepted}
        >
          <BigP>{question.answers}</BigP>
          <P>answers</P>
        </AnswerBox>
        <Container>
          <BigP>{question.votes}</BigP>
          <P>votes</P>
        </Container>
        <Container>
          <ViewsP big={true} views={question.question_views}>
            {question.question_views}
          </ViewsP>
          <ViewsP views={question.question_views}>views</ViewsP>
        </Container>
      </Data>
      <TagContainer>{tags}</TagContainer>
      <Hr />
    </>
  );
}

const Data = styled.div``;

const BigP = styled(P)`
  font-size: 17px;
`;

const SmallP = styled;

const AnswerBox = styled.div`
  border: 1px solid ${green};
  padding: 6px;
  color: ${props => (props.answers >= 1 ? green : black)};
`;

const ViewsP = styled(P)`
  color: ${props =>
    +props.views >= 10000
      ? tenKViews
      : +props.views >= 1000
      ? oneKViews
      : black};
  font-size: ${props => (props.big ? "17px" : "11px")};
`;

const TagContainer = styled.div`
  ${flex()}
`;

const Container = styled.div`
  ${flex("column")}
`;

const Hr = styled.div`
  border: 0.5px solid ${hrGray};
`;

export default HQCard;
