import React from "react";
import styled from "styled-components";
import { P, hrGray, flex } from "./../../utilites/index";

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
        <P>{question.question_views}</P>
        <P>views</P>
      </Container>
      <TagContainer>{/*tags*/}</TagContainer>
      <Hr />
    </>
  );
}

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
