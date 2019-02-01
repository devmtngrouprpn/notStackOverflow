import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1,
  borderGray,
  flex,
  blueButton
} from "../../utilites/index.js";

export default class QuestionId extends Component {
  state = {
    loading: false
  };

  componentDidMount = () => {
    // call for data useing props.match.params.id as the query
  };

  render() {
    return (
      <LoadingWraper loading={this.state.loading}>
        <Layout>
          <Box>
            <TopAdds />
            <TitleBox />
            <QuestionPage>
              <Content>
                <H1>Question Page {this.props.match.params.id}</H1>
              </Content>
              <Adds style={{ border: "1px red solid", height: "100vh" }} />
            </QuestionPage>
          </Box>
        </Layout>
      </LoadingWraper>
    );
  }
}

const AskButton = styled.button`
  ${blueButton("10.4px, 10.4px, 10.4px, 10.4px")}
`;

const TitleBox = styled.div`
  ${flex("row", "flex-start", "flex-start")}
`;

const Box = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 1100px;
`;

const TopAdds = styled.div`
  height: 90px;
  width: 100%;
  margin: 24px;
  border: gray 1px solid;
`;

const QuestionPage = styled(Page)`
  border-top: 1px solid ${borderGray};
  margin: 24px;
  width: 100%;
`;
