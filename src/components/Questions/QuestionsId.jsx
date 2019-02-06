import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import Quill from '../QuestionCreator/Quil'
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
    question: []
  };

  componentDidMount = async () => {
    const res = await axios.get(
      `/api/questions/indv?id=${this.props.match.params.id}`
    );
    console.log(res.data);
    this.setState({ loading: false, question: res.data[0] });
  };

  render() {
    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Box>
            <TopAdds />
            <TitleBox>
              <H1>{this.state.question.question_title}</H1>
              <AskButton>Ask Question</AskButton>
            </TitleBox>
            <QuestionPage>
              <Content>
                <Section>
                  <ArrowColumn stars={} votes={this.state.question.votes} />

                </Section>




              </Content>
              <Adds />
            </QuestionPage>
          </Box>
        </LoadingWraper>
      </Layout>
    );
  }
}
const Section = styled.div`
display: flex;
`
const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const TitleBox = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin: 0 24px;
  width: calc(100% - 48px);
`;

const Box = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 1100px;
  overflow: hidden;
`;

const TopAdds = styled.div`
  height: 90px;
  width: calc(100% - 48px);
  margin: 24px;
`;

const QuestionPage = styled(Page)`
  border-top: 1px solid ${borderGray};
  margin: 13px 24px 24px 24px;
  width: calc(100% - 48px);
`;
