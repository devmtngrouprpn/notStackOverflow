import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { TinyTag } from "../../utilites/index.js";
import stringSimilarity from "string-similarity";
import Quill from "../QuestionCreator/Quil";
import { connect } from "react-redux";
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { stringObjectToArray } from '../../test/Logic'
import Select from 'react-select'
// import { SearchBar } from '../../utilites/globals';
import Layout from '../Layout/Layout1'
import {
    LoadingWraper,
    SearchBar,
    P,
    black,
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
            tagNames: [],
            summaryPayload: '',
            selectedOption: 'your edit',
            choices: [],
            updateTextArea: false,
            viewingActive: false,
            idPayload: '',
        }
    }
    componentDidMount = async () => {
        const res = await axios.get(
            `/api/question/indv?id=${+this.props.match.params.id}`
        );
        console.log(res)
        let res2 = await axios.get('/api/tags/alltinytags');
        await this.setState({ user: res.data.user_id, original: res.data.question_content, source: res.data.question_id, loading: false, descPayload: res.data.question_content, tagsPayload: res.data.tags, titlePayload: res.data.question_title });
        await this.setState({ tags: res2.data.popular })
        let array = this.state.tags.map((e) => { return e.tag_name })
        this.setState({ tagNames: array, loading: false })
        let options = await axios.post('/api/page-edits', { source_id: this.state.source, source_type: 'question' });
        let edits
        if (options.data.pastEdits) {
            edits = options.data.pastEdits.map(e => { return { label: `Past Edit # ${e.edit_id}`, value: { e } } })
        } else { edits = [] }
        this.setState({ choices: [{ value: options.data.activeEdit, label: "Active Edit" }, ...edits] })
        console.log(options.data)
    };
    handleSelectChange = async (selectedOption) => {
        if (selectedOption.label === 'Active Edit') {
            selectedOption = selectedOption.value
            await this.setState({ idPayload: selectedOption.edit_id, viewingActive: true, updateTextArea: true, titlePayload: selectedOption.edit_title, descPayload: selectedOption.edit_content, tagsPayload: stringObjectToArray(selectedOption.edit_tags), summaryPayload: selectedOption.edit_summary });
        } else {
            selectedOption = selectedOption.value.e
            await this.setState({ idPayload: selectedOption.edit_id, viewingActive: false, updateTextArea: true, titlePayload: selectedOption.edit_title, descPayload: selectedOption.edit_content, tagsPayload: selectedOption.edit_tags.split('{')[1].split('}')[0].split(','), summaryPayload: selectedOption.edit_summary });
        }

        this.setState({ updateTextArea: false })
        console.log(selectedOption)
    }
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
    acceptEdit = async () => {
        await axios.put('/api/edits', {
            edit_id: this.state.idPayload,
            user_id: this.props.global.user.auth_id,
            source_id: this.state.source,
            source_type: 'question',
            edit_content: this.state.descPayload,
            edit_title: this.state.titlePayload,
            edit_tags: this.state.tagsPayload
        })
        this.props.history.goBack()
    }
    rejectEdit = async () => {
        console.log('sup')
        await axios.delete(`/api/edits?edit_id=${this.state.idPayload}`)
        this.props.history.goBack()

    }
    removeTag = (tag) => {
        let newArr = this.state.tagsPayload.filter((e) => { return e !== tag })
        this.setState({ tagsPayload: newArr })
    }
    uploadEdit = async () => {
        console.log(this.state.question_id)
        if (this.props.global.user.auth_id) {
            if (!this.state.tagsPayload.length < 1) {
                await axios.post('/api/edits', {
                    edit_title: this.state.titlePayload,
                    edit_content: this.state.descPayload,
                    edit_summary: this.state.summaryPayload,
                    edit_tags: this.state.tagsPayload,
                    user_id: this.props.global.user.auth_id,
                    source_id: this.state.source,
                    source_type: 'question'
                });
                console.log(this.props)
                this.props.history.goBack()
            } else { alert("you must select at least one related tag") }
        } else { alert('you must be logged in to submit edits') }
    }
    render() {
        return (
            <>
                <Layout>
                    <LoadingWraper loading={this.state.loading}>

                        <Container>
                            <Head>
                                <T>Your edit will be place in queue until it is peer reviewed.</T>
                                <T>We welcome all constructive edits, but please make them substantial. Avoid trivial edits unless absolutely necessary. </T>
                            </Head>
                            {this.state.idPayload}
                            <TagBar>View Other Edits</TagBar>
                            <TheSelect value={this.state.selectedOption.auth_id} onChange={this.handleSelectChange} options={this.state.choices} />
                            <TagBar>Title</TagBar>
                            <SearchBoxNotForTags value={this.state.titlePayload} onChange={e => this.setState({ titlePayload: e.target.value })} />
                            <TagBar>Body</TagBar>
                            <TextSpot reload={this.state.updateTextArea} dataStore={this.handleChange} reset={this.state.toggle} text={this.state.descPayload} />
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
                            <SearchBoxNotForTags value={this.state.summaryPayload} placeholder='briefly explain your changes (corrected spelling, fixed grammar, improved formatting' onChange={e => this.setState({ summaryPayload: e.target.value })} />
                            <Options>
                                <Button onClick={this.uploadEdit}>Submit Edit For Review</Button>
                                {this.state.viewingActive & (this.props.global.user.reputation > 10000 || this.props.global.user.auth_id === this.state.user_id) ? <> <Button onClick={this.acceptEdit}>Accept Edit</Button > <Button onClick={this.rejectEdit}>Reject Edit</Button></> : <></>}
                                <Cancel to='/'>Cancel</Cancel>
                            </Options>

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
function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}
export default connect(mapStateToProps)(QuestionEditor);
const Cancel = styled(Link)`
font-family:Helvetica;
text-decoration:none;
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
`
const TheSelect = styled(Select)`
width:100%;
font-family:Helvetica;

`
const Options = styled.div`
display:flex;
align-items:center;
`
const Original = styled(P)`
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

const Head = styled(P)`
color:${black};
                            padding: 15px 15px 10px;
                                background-color: #FFF8DC;
                                border: 1px solid #E0DCBF;
                                font-size: 14px;
                                width:100%;
                            `;
const TagBar = styled(P)`
                            width: 100%;
                            font-weight: bold;
                            text-align: left;
                            position: relative;
                            padding: 10px;
                            `;
const Container = styled.div`
color:${black};
                            padding:24px;
                            text-align: left;
                            /* width: 1100px; */
                            display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;
                            `;
