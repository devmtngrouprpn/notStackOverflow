import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'
import { connect } from 'react-redux'
import Quill from '../QuestionCreator/Quil'
import {
    P,
    borderGray,
    blueButton,
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
        await this.setState({ text: defaultValue })
    };
    componentDidMount() {
        console.log(this.props.global.user.auth_id)
    }
    uploadAnswer = async () => {
        if (this.props.global.user.auth_id) {
            console.log({
                user_id: this.props.global.user.auth_id, answer_content: this.state.text, question_id: this.props.questionId
            })
            let res = await axios.post('/api/answer', {
                user_id: this.props.global.user.auth_id, answer_content: this.state.text, question_id: this.props.questionId
            })

            this.props.reMount()
        } else { alert('please log in to post an answer') }
    };
    render() {
        return (
            <Holder>
                <Title>Your Answer</Title>
                {this.state.text}
                <NewAnswer height={'280px'} dataStore={this.handleChange} reset={this.state.toggle} text={this.state.descPayload} />
                <Borders />
                <SubmitButton onClick={this.uploadAnswer}>Post Your Answer</SubmitButton>
            </Holder>
        );
    }
}

function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}

export default connect(mapStateToProps)(AnswerCreator);
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