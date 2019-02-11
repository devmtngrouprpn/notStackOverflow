import React, { Component } from "react";
import styled from "styled-components";
import {
    Adds,
    Content,
    LoadingWraper,
    H1,
    P,
    flex,
    borderGray,
    blueButton
} from "../../utilites/index";
import axios from "axios";
import { connect } from 'react-redux'

class CommentSection extends Component {
    state = {
        edit: false,
        test: ''
    };

    // componentDidMount = async () => {

    // };
    submit() {

    }
    render() {
        return (
            <Shell>
                <Comments>{this.props.comments ? this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?=${e}`);
                    return <div>{res.data}</div>
                }) : <></>}</Comments>

                {this.state.edit ?
                    <Wrap>
                        <Text onChange={(e) => { this.setState({ text: e.target.value }) }}></Text>
                        <SubmitComment onClick={this.submit}>Add Comment</SubmitComment>
                    </Wrap>
                    :

                    <AddComment onClick={() => { this.setState({ edit: true }) }}>add a comment</AddComment>}

            </Shell>
        );
    }
}
function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}
export default connect(mapStateToProps)(CommentSection);
const SubmitComment = styled.button`
${blueButton()}
height:fit-content;
width:fit-content;
margin:5px;
`
const Wrap = styled.div`
width:100%;
display:flex;
`
const Text = styled.textarea`
width:100%;
min-height:80px;
overflow:auto;
`
const Comments = styled.div`
`
const AddComment = styled.div`
color: #848d95;
padding: 0 3px 2px;
cursor:pointer;
font-size:13px;
:hover{
    color: #3af;
}
`

const Shell = styled(P)`
border-top: 1px solid ${borderGray};
width:100%;
height:fit-content;
margin: 25px 0 25px 0px;
padding:25px 0 25px 0;
    `
