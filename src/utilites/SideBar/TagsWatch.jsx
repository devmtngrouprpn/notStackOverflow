import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { H1, P, TinyTag } from "./../index";

function TagsWatch() {
  // let tags =
  return (
    <WidgetBox>
      <TagBox>
        <TitleBox>
          <svg
            aria-hidden="true"
            class="svg-icon iconEye"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <Path d="M 9.06 3 C 4 3 1 9 1 9 s 3 6 8.06 6 C 14 15 17 9 17 9 s -3 -6 -7.94 -6 Z M 9 13 a 4 4 0 1 1 0 -8 a 4 4 0 0 1 0 8 Z m 2 -4 a 2 2 0 0 1 -2 2 a 2 2 0 0 1 -2 -2 a 2 2 0 0 1 2 -2 a 2 2 0 0 1 2 2 Z" />
          </svg>
          <Title>Watched Tags</Title>
          <EditButton>edit</EditButton>
        </TitleBox>
        <TagsDisplay>Hello I am the tags watching</TagsDisplay>
      </TagBox>
      user
      <TagBox>
        <TitleBox>
          <svg
            aria-hidden="true"
            class="svg-icon iconEye"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <Path d="M 5.52 13.89 a 6 6 0 0 0 8.37 -8.37 L 5.52 13.9 Z m -1.4 -1.41 l 8.36 -8.37 a 6 6 0 0 0 -8.37 8.37 Z M 9 17 A 8 8 0 1 1 9 1 a 8 8 0 0 1 0 16 Z" />
          </svg>
          <Title>Ignored Tags</Title>
          <EditButton>edit</EditButton>
        </TitleBox>
        <TagsDisplay>Hello I am the tags not watching</TagsDisplay>
      </TagBox>
    </WidgetBox>
  );
}
const NewImg = styled.div``;
const TagsDisplay = styled.div`
  display: flex;
  flex-direction: column !important;
  margin: 0;
  padding: 16px 15px;
  border-top: 1px solid #e4e6e8;
`;
const TitleBox = styled.div`
  padding: 12px 15px;
  background: #fafafb;
  color: #6a737c;
  font-size: 1.15384615rem;
  font-weight: normal;
  display: flex;
`;
const Title = styled(H1)`
  flex: 1 auto !important;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  margin-left: 1%;
`;
const WidgetBox = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  margin-bottom: 1.5em;
`;
const EditButton = styled(P)`
  color: #6a737c;
  margin-left: 12px !important;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 90%;
  vertical-align: baseline;
  margin-top: 1%;
`;
const TagBox = styled.div`
  position: relative;
  border: 1px solid #d6d9dc;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(59, 64, 69, 0.1);
  font-size: 13px;
  margin-bottom: 1.5em;
`;
const Path = styled.path`
  fill: currentColor;
`;
function mapStateToProps(state) {
  let { user } = state;
  return {
    user
  };
}
export default connect(
  mapStateToProps,
  {}
)(TagsWatch);
