import React from "react";
import styled from "styled-components";
import { P } from "./../../utilites/index";

function HQCard(props) {
  return (
    <>
      <hr />
      <Card>
          <InfoBox>
              <P>3</P>
              <P>Votes</P>
          </InfoBox>
          <InfoBox>
              <P>3</P>
              <P>Answers</P>
          </InfoBox>
          <InfoBox>
              <P>32</P>
              <P>Views</P>
          </InfoBox>

      </Card>
    </>
  );
}

export default HQCard;

const Card = styled.div`
  border: solid black;
  display: flex;
`;
const InfoBox = styled.div `
    display: flex;
    flex-direction: column;
`
