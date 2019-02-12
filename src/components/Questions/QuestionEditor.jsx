import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { TinyTag, position } from "../../utilites/index.js";
import stringSimilarity from "string-similarity";
import Quill from "../QuestionCreator/Quil";
import { connect } from "react-redux";
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
// import { SearchBar } from '../../utilites/globals';
import Layout from '../Layout/Layout1'
import {
    LoadingWraper,
    flex,
    SearchBar,
    P,
    blueButton,
} from "./../../utilites/index";

class QuestionEditor extends Component {
    constructor() {
        super()
        this.state = {
            titlePayload: '',
            tags: [],
            toggle: false,
            descPayload: '',
            loading: true,
            original: '',
            tagsPayload: [],
            tagsForMapping: [],
            typingTag: '',
            tagNames: []
        }
    }
    componentDidMount = async () => {
        const res = await axios.get(
            `/api/question/indv?id=${this.props.match.params.id}`
        );
        console.log(res.data)
        this.setState({ original: res.data.question_content, loading: false, descPayload: res.data.question_content, tagsPayload: res.data.tags });
        let res2 = await axios.get('/api/tags/alltinytags');
        console.log(res.data)
        this.setState({ tags: res2.data.popular })
        let array = this.state.tags.map((e) => { return e.name })
        this.setState({ tagNames: array, loading: false })
    };
    handleChange = async (defaultValue = '') => {
        await this.setState({ descPayload: defaultValue })
    }
    grabRelated = (e) => {
        this.setState({ typingTag: e.target.value })
        let object = stringSimilarity.findBestMatch(e.target.value, this.state.tagNames)
        object = object.ratings.sort((a, b) => { return a.rating * 100 - b.rating * 100 }).reverse().filter(a => a.rating > 0)
        object = object.slice(0, 6)
        this.setState({ tagsForMapping: object })
    }
    render() {
        console.log(this.state)
        return (
            <>
                <Layout>
                    <LoadingWraper loading={this.state.loading}>

                        <Container>
                            <Head>
                                <T>Your edit will be place in queue until it is peer reviewed.</T>
                                <T>We welcome all constructive edits, but please make them substantial. Avoid trivial edits unless absolutely necessary. </T>
                            </Head>
                            <TagBar>Title</TagBar>
                            <SearchBoxNotForTags value={this.state.titlePayload} onChange={e => this.setState({ titlePayload: e.target.value })} />
                            <TagBar>Body</TagBar>
                            <TextSpot dataStore={this.handleChange} reset={this.state.toggle} text={this.state.descPayload} />
                            <Original>
                                {ReactHtmlParser(this.state.original)}
                            </Original>
                            <DualBox>
                                <HiddenTags>{this.state.tagsPayload.map((e) => {
                                    return <BadTag onClick={
                                        () => { this.removeTag(e) }
                                    }>
                                        <TinyTag subject={e} x={true} notClickable={true} />
                                    </BadTag>
                                })}</HiddenTags>
                                <TagBox value={this.state.typingTag} onChange={(value) => this.grabRelated(value)} />
                            </DualBox>
                            <Suggestions>{this.state.tagsForMapping.map((e) => {
                                return <TinyTagHolder
                                    onClick={() => {
                                        if (!this.state.tagsPayload.includes(e.target)) {
                                            this.setState({ tagsPayload: [...this.state.tagsPayload, e.target], typingTag: '' })
                                        }
                                    }
                                    }
                                >
                                    <TinyTag
                                        subject={e.target} notClickable={true}
                                    />
                                </TinyTagHolder>
                            })}</Suggestions>
                            <TagBar>Edit Summary</TagBar>
                            <SearchBoxNotForTags placeholder='briefly explain your changes (corrected spelling, fixed grammar, improved formatting' onChange={e => this.setState({ titlePayload: e.target.value })} />
                        </Container>
                        <HowToTag>
                            <HowToTagTitle>How to Tag</HowToTagTitle>
                            <HowToTagContent>
                                A tag is a keyword or label that categorizes your question with other, similar questions. Choose one or more (up to 5) tags that will help answerers to find and interpret your question.<br /><br />
                                ► complete the sentence: my question is about...<br /><br />
                                ► use tags that describe things or concepts that are essential, not incidental to your question<br /><br />
                                ► favor using existing popular tags<br /><br />
                                ► read the descriptions that appear below the tag<br /><br />
                                If your question is primarily about a topic for which you can't find a tag:<br /><br />
                                ► combine multiple words into single-words with hyphens (e.g. ruby-on-rails), up to a maximum of 35 characters<br /><br />
                                ► creating new tags is a privilege; if you can't yet create a tag you need, then post this question without it, then ask the community to create it for you


                            </HowToTagContent>
                            <PopularTags to='/tags'>popular tags »</PopularTags>
                        </HowToTag>

                    </LoadingWraper>
                </Layout>
            </>
        );
    }
}

export default QuestionEditor;
const Original = styled.div`
text-align:left;
margin:15px;
border-top:rgb(200, 204, 208) 1px dotted;
border-bottom:rgb(200, 204, 208) 1px dotted;
padding:10px;
width:100%;
`
const PopularTags = styled(Link)`
text-decoration:none;
position: relative;
float:right;
margin: 15px;
color:#07C;
font-size:13px;
`
const HowToTagTitle = styled.div`
background:rgb(247, 241, 213);
padding:12px 15px 12px 15px;
color: #242729;
font-size: 18px;
font-weight: 400;`
const HowToTagContent = styled.div`
padding: 16px 13px 16px;
font-size:13px;
`
const HowToTag = styled(P)`
  box-shadow: 0px 2px 5px 1px lightgray;
width:363px;
margin:25px;
    border-color: #e6dfc6;
    background-color: #FFF8DC;
    border-bottom-left-radius:3px;
    border-bottom-right-radius:3px;
`
const T = styled.div`
margin-bottom:1em;
font-size:14px;
`
const B = styled.div``
const RedButton = styled.button`
${blueButton()};
color: #9c1724;
height: fit-content;
background: none;
border: none;
box-shadow: none;
cursor: pointer;
:hover {
background: #fdf3f4;
box-shadow: none;
color: #9c1724;
}
`;
const PageTurner = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
align-items: center;
`;
const BadTag = styled.div`
width: fit-content;
height: fit-content;
`;
const TagBox = styled(SearchBar)`
border-top-left-radius:0;
border-bottom-left-radius: 0;
max-height: 50px;
margin-left:0;
border-left:none;
width: available;
:focus{
box-shadow:none;
outline:none;
border:none;
/* border-color: transparent; */
                            }
                            `
const DualBox = styled.div`
                            flex-wrap: nowrap;
                            display:flex;
                            max-height: 40px;
                            width: 100%;
                            display: flex;
                            border-radius: 3px;
:focus-within{
                                outline: none;
                            /* border: 1px solid #66bfff; */
                            border:none;
                            border-color: transparent;
                            
                            box-shadow: 0 0 0 4px rgba(0, 149, 256, 0.15);
                            }
                            `;
const HiddenTags = styled.div`
                            display:flex;
                            max-height: 50px;
                            border: 1px solid lightgray;
                            border-radius:3px;
                            margin-right: 0;
                            border-right: none;
                            border-bottom-right-radius: 0;
                            border-top-right-radius:0;
                            border-top-left-radius: 3px;
                            border-top-right-radius: 3px;
:focus{
                                /* border-color: transparent; */
                                box-shadow: none;
                            border-top-right-radius:0;
                            outline:none;
                            border: 1px solid lightgray;
                            
                            }
:active{
                                border: none;
                            }
                            `
const SearchBoxNotForTags = styled(SearchBar)`
                            max-height: 50px;
                            margin-left: 0;
                            width: 100%;
                            margin-bottom: 20px;
                            `;
const SearchBox = styled(SearchBar)`
                            border-top-left-radius: 0;
                            border-bottom-left-radius: 0;
                            max-height: 50px;
                            margin-left: 0;
                            border-left: none;
                            width: available;
                            `;
const TinyTagHolder = styled.div`
                            height: 30px;
                            width: fit-content;
                            `;
const Suggestions = styled.div`
                            padding: 20px;
                            display: flex;
                            position: relative;
                            border-radius: 3px;
                            left: 6px;
                            box-sizing: border-box;
                            width: 100%;
                            /* height: 200px; */
                            `;
const TextSpot = styled(Quill)`
                            width: 100%;
                            `;
const Button = styled.button`
                            margin: 10px;
                            float: right;
${blueButton()};
                            cursor: pointer;
                            `
const GrayButton = styled.button`
                            border:1px solid transparent;
                            margin: 10px;
                            float: right;
                            background-color:#AFC2CF;
                            color: rgba(255,255,255,0.8);
                            border-radius: 3px;
                            padding:8px 10px 8px 10px;
                            outline: none;
                            font-size: 13px;
                            white-space: nowrap;
                            `
const Head = styled(P)`
                            padding: 15px 15px 10px;
                                background-color: #FFF8DC;
                                border: 1px solid #E0DCBF;
                                font-size: 14px;
                                width:100%;
                            `;
const X = styled.path`
                            fill: red;
                            `;
const Identify = styled(P)`
                            text-align: left;
                            width: 100%;
                            font-weight: bold;
                            `;
const Check = styled.path`
                            fill: green;
                            `;
const Example = styled(P)`
                            font-size: 14px;
                            margin: 15px;
                            `;
const Active = styled(P)`
                            margin: 10px;
${blueButton()};
                            width: fit-content;
                            height: fit-content;
                            border-radius: 50px;
                            cursor: pointer;
                            `;
const TagBar = styled(P)`
                            width: 100%;
                            font-weight: bold;
                            text-align: left;
                            position: relative;
                            padding: 10px;
                            `;

const Option = styled(P)`
                            cursor: pointer;
                            margin: 10px;
                            color: #07c;
                            padding: 8px 10px 8px 10px;
:hover {
                                border - radius: 50px;
                            /* box-shadow: inset 0 1px 0 #66bfff; */
                            padding: 8px 10px 8px 10px;
                            background: #e1f0fc;
                            }
                            `;
const CurrentStep = styled(P)`
${flex()}
                            margin: 20px;
                            `;
const Tutorial = styled.div`
                            text-align: left;
                            border: 1px #d6d9dc solid;
                            border-radius: 3px;
                            margin-bottom: 24px;
                            padding: 24px;
                            background-color: #fafafb;
                            `;
const Container = styled.div`
                            padding:24px;
                            text-align: left;
                            /* width: 1100px; */
                            display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;
                            `;
const Page = styled.div`
                            margin: 10px;
                            text-align: left;
                            width: 100%;
                            height: 100%;
${flex()};
                            position: relative;
                            `;
