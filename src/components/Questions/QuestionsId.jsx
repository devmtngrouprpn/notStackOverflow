import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import Quill from '../QuestionCreator/Quil'
import ArrowColumn from '../../utilites/ArrowColumn'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1,
  borderGray,
  flex,
  blueButton,
  TinyTag
} from "../../utilites/index.js";
import axios from "axios";
import { format } from "path";

export default class QuestionId extends Component {
  state = {
    loading: true,
    question: { question_content: '', question_title: '', tags: [] },

  };

  componentDidMount = async () => {
    const res = await axios.get(
      `/api/questions/indv?id=${this.props.match.params.id}`
    );
    console.log(res.data);
    this.setState({ loading: false, question: res.data });
  };
  render() {
    let { question } = this.state
    // console.log(question.question_content)
    // let message = question.question_content.replace(/^"'/, '').replace(/'"$/, '');
    // console.log(message)
    // let messageCopy = message.split(`'`)
    // let formatedhtml = messageCopy.slice(1, messageCopy.length - 1).join('').replace(/,,/g, `'`)
    // let newHtml = question.question_content.replace(/^"'/, '').replace(/'"$/, '').split(`'`)
    // console.log(newHtml)
    return (
      <Layout>
        <LoadingWraper loading={this.state.loading}>
          <Box>
            <TopAdds />
            <TitleBox>
              <H1>{question.question_title}</H1>
              <AskButton>Ask Question</AskButton>
            </TitleBox>
            <QuestionPage>
              <Content>
                <Section>
                  <ArrowColumn stars={24} votes={2000} />
                  <QuestionContent>
                    {ReactHtmlParser(question.question_content)}
                    {/* <div dangerouslySetInnerHTML={{ __html: message }} /> */}
                    {/* <Tags>
                      {}
                    </Tags> */}
                    <QuestionTags>
                      {question.tags.map(e => { return (<TinyTag subject={e} />) })}
                    </QuestionTags>
                  </QuestionContent>
                </Section>
              </Content>
              <AddsColumn>
                <AskedInfo>
                  <Posted>asked</Posted><br />
                  <Posted>viewed</Posted><br />
                  {question.bounty_value ? <Posted>Active</Posted> : <></>}
                </AskedInfo>
                <Adds />
              </AddsColumn>
            </QuestionPage>
          </Box>
        </LoadingWraper>
      </Layout>
    );
  }
}
const Posted = styled.span`
margin: 15px 0px 15px 15px;
`
const AskedInfo = styled.div`
margin-bottom:15px;
`
const AddsColumn = styled.div`
width:100%;
padding: 25px 0 25px 25px;
`
const QuestionTags = styled.div`
display: flex;
`
const QuestionContent = styled.div`
    
    `
const Section = styled.div`
    display: flex;
    align-items:flex-start;
    margin: 25px 5px 25px 5px;
    border-bottom: 1px solid ${borderGray};
    height: fit-content;
    width: 750px;
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
  /* ${flex("column")} */
        /* flex-basis: 1100px; */
        /* overflow: visible; */
        height: fit-content;
        width:100%;
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
        height:fit-content;
      `;
