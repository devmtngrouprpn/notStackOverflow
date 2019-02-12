import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'
import ArrowColumn from '../../utilites/ArrowColumn'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import UserTagForAnswer from '../../utilites/UserTagForAnswer'
import CommentSection from './CommentSection'
import { connect } from 'react-redux'
import Quill from '../QuestionCreator/Quil'
import {
    Page,
    Adds,
    Content,
    LoadingWraper,
    P,
    borderGray,
    flex,
    blueButton,
    TinyTag
} from "../../utilites/index.js";

class Answer extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            toggle: false,
            answer: { tags: [] }
        };
    }
    componentDidMount = async () => {
        let res = await axios.get(`/api/answer/indv?id=${this.props.id}`)
        console.log(res.data)
        this.setState({ answer: res.data })
    }
    reset = async () => {
        let res = await axios.get(`/api/answer/indv?id=${this.props.id}`)
        console.log(res.data)
        await this.setState({ answer: res.data })
    }
    render() {
        let { answer } = this.state
        console.log(answer)
        return (
            <Wrapper>
                <ArrowColumn reset={this.reset} id={answer.answer_id} type={'answer'} noStars={true} votes={answer.votes} />
                <Section>
                    <QuestionContent>
                        {ReactHtmlParser(answer.answer_content)}
                    </QuestionContent>
                    <ShareEditUser><div>edit</div>{answer.answer_creation_timestamp ? <QuestionUserTag question={answer} /> : <></>}</ShareEditUser>
                    <CommentSection comments={answer.comments} reMount={this.reset} type={'answer'} id={answer.answer_id} />
                </Section >
            </Wrapper>
        );
    }
}

function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}

export default connect(mapStateToProps)(Answer);

const Wrapper = styled(P)`
display:flex;
width:100%;
`
const QuestionUserTag = styled(UserTagForAnswer)`
height:50px;
width:50px;
background: blue;
border:1px black solid;
padding: 30px;
`

const ShareEditUser = styled.div`
display:flex;
width:100%;
align-items:center;
justify-content:space-between;
`
const QuestionContent = styled.div`
    
    `
const Section = styled.div`
    display: flex;
    flex-flow:column;
    align-items:flex-start;
    margin: 25px 5px 25px 5px;
    border-bottom: 1px solid ${borderGray};
    height: fit-content;
    width: 100%;
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
