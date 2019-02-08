import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'
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

class AnswerCreator extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            toggle: false
        };
    }
    handleChange = async (defaultValue = '') => {
        await this.setState({ descPayload: defaultValue })
    };
    uploadAnswer = async () => {
        let res = await axios.post('/api/answer', {
            user_id: this.props.global.user.auth_id, answer_content: this.state.text, question_id: this.props.questionId
        })

        this.props.reMount()
    };
    render() {
        return (
            <Holder>
                <Title>Your Answer</Title>
                <NewAnswer height={'280px'} dataStore={this.handleChange} reset={this.state.toggle} text={this.state.descPayload} />
                <Borders />
                <SubmitButton>Post Your Answer</SubmitButton>
            </Holder>
        );
    }
}

export default AnswerCreator
const Holder = styled(P)`
width:100%;
`
const Borders = styled.div`
margin: 15px 0 15px 0;
height: 30px;
width: 100%;
border-bottom: 1px solid ${borderGray};
border-top: 1px solid ${borderGray};
`
const SubmitButton = styled.button`
${blueButton()}
`
const Title = styled.div`
font-size: 18px;
padding-top: 20px;
margin-bottom:18px;
`
const NewAnswer = styled(Quill)`
width:100%;
height:280px;
`