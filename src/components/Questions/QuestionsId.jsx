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
import axios from "axios";

export default class QuestionId extends Component {
  state = {
    loading: true,
    question: {}
  };

  componentDidMount = async () => {
    const res = await axios.get(
      `/api/questions/indv?id=${this.props.match.params.id}`
    );
    this.setState({ loading: false, question: res.data });
  };

  render() {
    return (
      <LoadingWraper loading={this.state.loading}>
        <Layout>
          <Box>
            <TopAdds />
            <TitleBox>
              <H1>{this.state.question.question_title}</H1>
              <AskButton>Ask Question</AskButton>
            </TitleBox>
            <QuestionPage>
              <Content>
                <H1>Question Page {this.props.match.params.id}</H1>
              </Content>
              <Adds />
            </QuestionPage>
          </Box>
        </Layout>
      </LoadingWraper>
    );
  }
}

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const TitleBox = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin: 0 24px;
  width: 100%;
`;

const Box = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 1100px;
`;

const TopAdds = styled.div`
  height: 90px;
  width: 100%;
  margin: 24px;
`;

const QuestionPage = styled(Page)`
  border-top: 1px solid ${borderGray};
  margin: 13px 24px 24px 24px;
  width: 100%;
`;
