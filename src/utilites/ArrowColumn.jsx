import React, { Component } from "react";
import styled from "styled-components";
import {
    Adds,
    Content,
    LoadingWraper,
    H1,
    P,
    flex,
} from "../utilites/index.js";
import axios from "axios";
import { connect } from 'react-redux'

class ArrowColumn extends Component {
    state = {
        loading: true,
        question: []
    };

    componentDidMount = async () => {

    };
    upvote = async () => {
        console.log({ user_id: this.props.global.user.auth_id, source_id: this.props.id, source_type: this.props.type, value: 1 })
        let res = await axios.post('api/question/vote', {
            user_id: this.props.global.user.auth_id, source_id: this.props.id, source_type: this.props.type, value: 1
        })
        this.props.reset();
    }
    downVote = async () => {
        let res = await axios.post('api/question/vote', {
            user_id: this.props.global.user.auth_id, source_id: this.props.id, source_type: this.props.type, value: -1
        })
        this.props.reset();
    }
    favorite = async () => {

        console.log({
            user_id: this.props.global.user.auth_id, question_id: this.props.id
        })
        let res = await axios.post('api/question/favorite', {
            user_id: this.props.global.user.auth_id, question_id: this.props.id, favnum: this.props.favnun
        })
        this.props.reset();
    }
    unFavorite() {

    }
    render() {
        return (
            <Shell>
                <Svg onClick={this.upvote} aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><Path d="M2 26h32L18 10z"></Path></Svg>
                <Votes>{this.props.votes ? this.props.votes : 0}</Votes>
                <Bottom onClick={this.downVote} aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><Path d="M2 26h32L18 10z"></Path></Bottom>
                {this.props.noStars ? <></> : <><Svg onClick={this.favorite} aria-hidden="true" class="svg-icon iconStar" width="18" height="18" viewBox="0 0 18 18"><Path d="M9 12.65l-5.29 3.63 1.82-6.15L.44 6.22l6.42-.17L9 0l2.14 6.05 6.42.17-5.1 3.9 1.83 6.16z"></Path></Svg>
                    <Stars>{this.props.favorites || 0}</Stars></>}
            </Shell>
        );
    }
}
function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}

export default connect(mapStateToProps)(ArrowColumn);

const Svg = styled.svg`
    color: rgb(187, 192, 196);
    
    `
const Votes = styled.div`
    margin: 2px;
    color:rgb(106, 115, 124);
    font-size:1.61538462rem;
    `
const Stars = styled.div`
    margin-top:8px;
    `
const Bottom = styled.svg`
    color: rgb(187, 192, 196);
    
        /* transform-origin: 0px 0px 0px; */
    transform: rotate(180deg);
    `
const Path = styled.path`
    /* transform: rotate(45deg); */
    fill: rgb(187, 192, 196);
    
    `
const Shell = styled(P)`
    color: rgb(187, 192, 196);
    display:flex;
    flex-flow:column;
    margin:15px;
    margin-left: 0px;
    justify-content:center;
    align-items:center;
    `
