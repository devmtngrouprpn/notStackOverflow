import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {
    Adds,
    Content,
    LoadingWraper,
    H1,
    P,
    flex,
    borderGray,
    blueButton,
} from "../../utilites/index";
import axios from "axios";
import { connect } from 'react-redux'
import { promised } from "q";

class CommentSection extends Component {
    state = {
        edit: false,
        test: '',
        loading: false,
        commentDisplay: []
    };

    componentDidMount = async () => {
        let buffer = []
        if (this.props.comments) {
            await Promise.all(
                this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?id=${e}`);
                    console.log(res.data, 'comment return')
                    buffer.push(<Comment key={e}>
                        <Rep>{res.data.votes || 0} {this.props.global.user.reputation >= 15 ? <button>Upvote</button> : <></>}</Rep>
                        {res.data.content}
                        <UserName to={`/users/${res.data.username}`}> - {res.data.username}</UserName>
                        <TimeStamp>{res.data.comment_creation_timestamp}</TimeStamp>
                    </Comment>)
                })
            )
            await this.setState({ commentDisplay: buffer.sort((a, b) => a.key - b.key) })
            console.log(this.state.commentDisplay, 'state')
        }
    };
    reRun = async () => {
        let buffer = []
        if (this.props.comments) {
            await Promise.all(
                this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?id=${e}`);
                    console.log(res.data, 'comment return')
                    buffer.push(<Comment>{res.data.content}</Comment>)
                })
            )
            this.setState({ commentDisplay: buffer })
            console.log('done')
        }
    }
    componentDidUpdate = async (previousProps) => {
        let buffer = []
        console.log(this.props.comments, previousProps, 'pastdata')
        // if (this.props.comments.length !== previousProps.length) {
        //     await Promise.all(
        //         this.props.comments.map(async e => {
        //             let res = await axios.get(`/api/comment/indv?id=${e}`);
        //             console.log(res.data, 'comment return')
        //             buffer.push(<Comment>{res.data.content}</Comment>)
        //         })
        //     )
        //     this.setState({ commentDisplay: buffer })
        //     console.log('done')
        // }
    };
    submit = async () => {
        if (this.props.global.user.auth_id) {
            console.log({
                user_id: this.props.global.user.auth_id, content: this.state.text, source_id: this.props.id, source_type: this.props.type
            })
            let res = await axios.post('/api/comment', {
                user_id: this.props.global.user.auth_id, content: this.state.text, source_id: this.props.id, source_type: this.props.type
            })
            console.log('submited')
            this.props.reMount()
            // this.reRun()
            this.setState({ edit: false })
        } else { alert('please log in to post a comment') }

    }
    render() {
        console.log('buffer', this.state.commentDisplay)
        console.log(this.props.comments, 'comments')
        return (
            // <LoadingWraper loading={this.state.loading}>
            <Shell>
                <Comments>
                    {this.state.commentDisplay}
                </Comments>
                {this.state.edit ?
                    <Wrap>
                        <Text onChange={(e) => { this.setState({ text: e.target.value }) }} />
                        <SubmitComment onClick={this.submit}>Add Comment</SubmitComment>
                    </Wrap>
                    :
                    <AddComment onClick={() => { this.setState({ edit: true }) }}>add a comment</AddComment>}

            </Shell>
            // {/* </LoadingWraper> */ }
        );
    }
}
function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}
export default connect(mapStateToProps)(CommentSection);
const TimeStamp = styled.div`

`
const Rep = styled.div`
color: rgb(145, 153, 161);
margin-right: 15px;
font-size:13px;
`
const UserName = styled(Link)`
text-decoration:none;

`
const Comment = styled.div`
display:flex;
align-items:center;
margin-top:5px;
padding-top:5px;
margin-bottom: 5px;
padding-bottom:5px;
border-bottom: 1px solid ${borderGray};

`
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
height:500px;
margin: 25px 0 25px 0px;
padding:5px 0 5px 0;

    `
