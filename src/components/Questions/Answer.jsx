import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'
import { Link } from 'react-router-dom'
import ArrowColumn from '../../utilites/ArrowColumn'
import ReactHtmlParser from 'react-html-parser'
import UserTagForAnswer from '../../utilites/UserTagForAnswer'
import CommentSection from './CommentSection'
import { connect } from 'react-redux'
import {
    LoadingWraper,
    P,
    borderGray,
} from "../../utilites/index.js";

class Answer extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            toggle: false,
            answer: { tags: [] },
            loading: true
        };
    }
    componentDidMount = async () => {
        let res = await axios.get(`/api/answer/indv?id=${this.props.id}`)
        this.setState({ answer: res.data, loading: false })
        console.log(res.data, 'answer')
    }
    reset = async () => {
        let res = await axios.get(`/api/answer/indv?id=${this.props.id}`)
        await this.setState({ answer: res.data })
    }
    render() {
        let { answer } = this.state
        return (
            <LoadingWraper loading={this.state.loading}>


                <Wrapper>
                    <ArrowColumn owner={answer.user_id} accepted={this.state.answer.accepted} showCheck={true} acceptShow={this.state.answer.answer_accepted} reset={this.reset} id={answer.answer_id} type={'answer'} noStars={true} votes={answer.votes} />
                    <Section>
                        <QuestionContent>
                            {ReactHtmlParser(answer.answer_content)}
                        </QuestionContent>
                        <ShareEditUser><Edit to={`/edit/answer/${answer.answer_id}`}>edit</Edit>{answer.answer_creation_timestamp ? <QuestionUserTag question={answer} /> : <></>}</ShareEditUser>
                        <CommentSection reset={this.reset} comments={answer.comments} reMount={this.reset} type={'answer'} id={answer.answer_id} />
                    </Section >
                </Wrapper>

            </LoadingWraper>
        );

    }
}

function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}

export default connect(mapStateToProps)(Answer);
const Edit = styled(Link)`

`
const Wrapper = styled(P)`
position:relative;
display:flex;
float:top;
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
    /* height: fit-content; */
    width: 100%;
    `