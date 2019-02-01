import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1,
  borderGray
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
          <TopAdds />
          <QuestionPage>
            <Content>
              <H1>Question Page {this.props.match.params.id}</H1>
            </Content>
            <Adds />
          </QuestionPage>
        </Layout>
      </LoadingWraper>
    );
  }
}

const TopAdds = styled.div`
  height: 90px;
  margin: 24px;
`;

const QuestionPage = styled(Page)`
  border-top: 1px solid ${borderGray};
  margin: 24px;
`;
