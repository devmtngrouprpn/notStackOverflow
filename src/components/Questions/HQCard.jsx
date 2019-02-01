import React from "react";
import styled from "styled-components";
import {
  P,
  hrGray,
  flex,
  tenKViews,
  oneKViews,
  black
} from "./../../utilites/index";

function HQCard({ question }) {
  console.log(question);
  return (
    <>
      <Container>
        <P>{question.answers}</P>
        <P>answers</P>
      </Container>
      <Container>
        <P>{question.votes}</P>
        <P>votes</P>
      </Container>
      <Container>
        <ViewsP views={question.question_views}>
          {question.question_views}
        </ViewsP>
        <ViewsP views={question.question_views}>views</ViewsP>
      </Container>
      <TagContainer>{/*tags*/}</TagContainer>
      <Hr />
    </>
  );
}

const ViewsP = styled(P)`
  color: ${props =>
    +props.views >= 10000
      ? tenKViews
      : +props.views >= 1000
      ? oneKViews
      : black};
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
