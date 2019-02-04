import React, { Component } from "react";
import axios from 'axios'
import styled from "styled-components";
import { TinyTag } from "../../utilites/index.js";
import quillsheet from './quilsheet.css'
import stringSimilarity from 'string-similarity'
import Quill from './Quil'
// import { SearchBar } from '../../utilites/globals';
import HQCard from "./../Questions/HQCard";
import Layout2 from '../Layout/Layout2'
import {
    flex,
    SearchBar,
    P,
    blueButton,
    LoadingWraper,
    TabButton,
} from "./../../utilites/index";
import reducer from "../../ducks/global.js";

export default class Tags extends Component {
    constructor() {
        super();
        this.state = {
            assosiated: [],
            tagsForMapping: [],
            status: 'tags',
            typingTag: '',
            desc: '',
            tagNames: [],
            tagsPayload: [],
            descPayload: '',
            titlePayload: '',
        };
    };
    componentDidMount = async () => {
        let res = await axios.get('/api/tags/alltinytags');
        this.setState({ tags: res.data.allTags })
        let array = this.state.tags.map((e) => { return e.name })
        this.setState({ tagNames: array })
    };
    submitQuestion = () => { }
    handleChange = (defaultValue) => {
        this.setState({ descPayload: defaultValue })
    }
    removeTag = (tag) => {
        let newArr = this.state.tagsPayload.filter((e) => { return e !== tag })
        this.setState({ tagsPayload: newArr })
    }
    active = (value) => {
        if (this.state.status === value) {
            return `color:blue`
        }

    }
    grabRelated = (value) => {
        this.setState({ typingTag: value.target.value })
        let object = stringSimilarity.findBestMatch(value.target.value, this.state.tagNames)
        object = object.ratings.slice(0, 6)
        object = object.sort((a, b) => { return a.rating - b.rating }).reverse().filter(a => a.rating > 0)
        this.setState({ tagsForMapping: object })
    }
    render() {
        if (this.state.status === 'tags') {
            return (
                <>
                    <Layout2>
                        <Page>
                            <Container>
                                <CurrentStep>
                                    <Active onClick={() => this.setState({ status: 'tags' })}>Tags</Active>
                                    <Option onClick={() => this.setState({ status: 'title' })}>Title</Option>
                                    <Option onClick={() => this.setState({ status: 'desc' })}>Description</Option>
                                    <Option onClick={() => this.setState({ status: 'review' })}>Review</Option>
                                </CurrentStep>
                                <Head>What languages, technologies, and/or frameworks is your question about?</Head>
                                <Help>Tags help the right people find and answer your question.</Help>
                                <Tutorial>
                                    <Identify>Identify your tags by completing the sentence, “My question is about…”</Identify>
                                    <Example>For example:</Example>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z"></Check></svg>Include tags that are crucial to your question only,</P>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z"></X></svg>Only include version numbers, like c#-4.0, when absolutely necessary</P>
                                </Tutorial>
                                <TagBar>Tags</TagBar>
                                <DualBox>
                                    <HiddenTags>{this.state.tagsPayload.map((e) => {
                                        return <BadTag onClick={
                                            () => { this.removeTag(e) }
                                        }>
                                            <TinyTag subject={e} />
                                        </BadTag>
                                    })}</HiddenTags>
                                    <SearchBox onChange={(value) => this.grabRelated(value)} />
                                </DualBox>
                                <Suggestions>{this.state.tagsForMapping.map((e) => {
                                    return <TinyTagHolder
                                        onClick={() => {
                                            if (!this.state.tagsPayload.includes(e.target)) {
                                                this.setState({ tagsPayload: [...this.state.tagsPayload, e.target], tagsForMapping: [] })
                                            }
                                        }
                                        }
                                    >
                                        <TinyTag
                                            subject={e.target}
                                        />
                                    </TinyTagHolder>
                                })}</Suggestions>
                                <PageTurner>
                                    <Button onClick={() => { this.setState({ status: 'title' }) }}>Next Step</Button>
                                </PageTurner>
                            </Container>
                        </Page>
                    </Layout2>
                </>
            )
        }
        else if (this.state.status === 'title') {
            return (
                <>
                    <Layout2>
                        <Page>
                            <Container>
                                <CurrentStep>
                                    <Option onClick={() => this.setState({ status: 'tags' })}>Tags</Option>
                                    <Active onClick={() => this.setState({ status: 'title' })}>Title</Active>
                                    <Option onClick={() => this.setState({ status: 'desc' })}>Description</Option>
                                    <Option onClick={() => this.setState({ status: 'review' })}>Review</Option>
                                </CurrentStep>
                                <Head>What’s your question title?</Head>
                                <Help>Your title helps people quickly understand what your question is about so they can answer it.</Help>
                                <Tutorial>
                                    <Identify>Identify your tags by completing the sentence, “My question is about…”</Identify>
                                    <Example>For example:</Example>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z"></Check></svg>Say “Is there an R function for finding the index of an element in a vector?”</P>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z"></X></svg>Don’t say “Please help with R”</P>
                                    <br />
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z"></Check></svg>Say “How to fix ‘Headers already sent’ error in PHP”</P>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z"></X></svg>Don’t say “PHP error: Why isn’t this working?”</P>
                                </Tutorial>
                                <TagBar>Title</TagBar>
                                <SearchBoxNotForTags value={this.state.titlePayload} onChange={e => this.setState({ titlePayload: e.target.value })} />
                                <PageTurner>
                                    <Button onClick={() => { this.setState({ status: 'tags' }) }}>Previous Step</Button>
                                    <Button onClick={() => { this.setState({ status: 'desc' }) }}>Next Step</Button>
                                </PageTurner>
                            </Container>
                        </Page>
                    </Layout2>
                </>
            )
        } else if (this.state.status === 'desc') {
            return (
                <>
                    <Layout2>
                        <Page>
                            <Container>
                                <CurrentStep>
                                    <Option onClick={() => this.setState({ status: 'tags' })}>Tags</Option>
                                    <Option onClick={() => this.setState({ status: 'title' })}>Title</Option>
                                    <Active onClick={() => this.setState({ status: 'desc' })}>Description</Active>
                                    <Option onClick={() => this.setState({ status: 'review' })}>Review</Option>
                                </CurrentStep>
                                <Head>Tell us more about your question</Head>
                                <Help>Your description gives people the information they need to help you answer your question.</Help>
                                <TextSpot dataStore={this.handleChange} text={this.state.descPayload} />
                                <PageTurner>
                                    <Button onClick={() => { this.setState({ status: 'title' }) }}>Previous Step</Button>
                                    <Button onClick={() => { this.setState({ status: 'review' }) }}>Next Step</Button>
                                </PageTurner>
                            </Container>
                        </Page>
                    </Layout2>
                </>)

        } else if (this.state.status === 'review') {
            return (
                <>
                    <Layout2>
                        <Page>
                            <Container>
                                <CurrentStep>
                                    <Option onClick={() => this.setState({ status: 'tags' })}>Tags</Option>
                                    <Option onClick={() => this.setState({ status: 'title' })}>Title</Option>
                                    <Option onClick={() => this.setState({ status: 'desc' })}>Description</Option>
                                    <Active onClick={() => this.setState({ status: 'review' })}>Review</Active>
                                </CurrentStep>
                                <Head>Review your question</Head>
                                <Help>Almost there! Let’s give your question one more look. And don’t worry—you can edit your question after it’s posted, too.</Help>
                                <Tutorial>
                                    <Identify>Identify your tags by completing the sentence, “My question is about…”</Identify>
                                    <Example>For example:</Example>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z"></Check></svg>Format your code: SELECT * FROM Users WHERE Id = 1;</P>
                                    <P><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z"></X></svg>Don’t include slang or shorthand: “u can’t bc it returns -1”</P>
                                </Tutorial>
                                <TagBar>Title</TagBar>
                                <SearchBoxNotForTags value={this.state.titlePayload} onChange={e => this.setState({ titlePayload: e.target.value })} />
                                <TextSpot dataStore={this.handleChange} text={this.state.descPayload} />
                                <TagBar>Tags</TagBar>
                                <DualBox>
                                    <HiddenTags>{this.state.tagsPayload.map((e) => {
                                        return <BadTag onClick={
                                            () => { this.removeTag(e) }
                                        }>
                                            <TinyTag subject={e} />
                                        </BadTag>
                                    })}</HiddenTags>
                                    <SearchBox onChange={(value) => this.grabRelated(value)} />
                                </DualBox>
                                <Suggestions>{this.state.tagsForMapping.map((e) => {
                                    return <TinyTagHolder
                                        onClick={() => {
                                            if (!this.state.tagsPayload.includes(e.target)) {
                                                this.setState({ tagsPayload: [...this.state.tagsPayload, e.target] })
                                            }
                                        }
                                        }
                                    >
                                        <TinyTag
                                            subject={e.target}
                                        />
                                    </TinyTagHolder>
                                })}</Suggestions>
                                <PageTurner>
                                    <Button onClick={() => { this.setState({ status: 'desc' }) }}>Previous Step</Button>
                                    <Button onClick={this.submitQuestion}>Submit Question</Button>
                                </PageTurner>
                            </Container>
                        </Page>
                    </Layout2>
                </>)
        }
    }
}
const PageTurner = styled.div`
width: 100%;
display:flex;
justify-content:flex-end;
`
const BadTag = styled.div`
width: fit-content;
height: fit-content;
`
const DualBox = styled.div`
flex-wrap: nowrap;
display:flex;
max-height: 40px;
width: 100%;
display: flex;
`
const HiddenTags = styled.div`
display:flex;
max-height: 50px;
border: 1px solid lightgray;
border-radius:3px;
margin-right: 0;
border-right: none;
border-top-right-radius:0;
border-bottom-right-radius: 0;
`
const SearchBoxNotForTags = styled(SearchBar)`
max-height: 50px;
margin-left:0;
width: 100%;
margin-bottom: 20px;
`
const SearchBox = styled(SearchBar)`
border-top-left-radius:0;
border-bottom-left-radius: 0;
max-height: 50px;
margin-left:0;
border-left:none;
width: available;
`
const TinyTagHolder = styled.div`
height:30px;
width:fit-content;
`
const Suggestions = styled.div`
padding: 20px;
display:flex;
position:relative;
border-radius: 3px;
left: 6px;
box-sizing:border-box;
width:100%;
/* height: 200px; */
`
const TextSpot = styled(Quill)`
width: 100%;
`
const Button = styled.button`
margin: 10px;
margin:
float: right;
${blueButton()}
`
const Head = styled(P)`
width:100%;
text-align:left;
font-weight: bold;
font-size: 30px;
`
const Help = styled(P)`
margin: 15px;
text-align: left;
width:100%;
margin-bottom: 30px;
`
const X = styled.path`
fill:red;
`
const Identify = styled(P)`
text-align: left;
width: 100%;
font-weight: bold;
`
const Check = styled.path`
fill:green;
`
const Example = styled(P)`
font-size: 14px;
margin: 15px;
`
const Active = styled(P)`
margin: 10px;
${blueButton()};
width: fit-content;
height: fit-content;
border-radius: 50px;
`
const TagBar = styled(P)`
width: 100%;
font-weight: bold;
text-align:left;
position: relative;
padding: 10px;
`

const Option = styled.div`
margin: 10px;
color: blue;
`
const CurrentStep = styled.div`
${ flex()}
margin: 20px;

`
const Tutorial = styled.div`
text-align: left;
border: 1px #d6d9dc solid;
border-radius: 3px;
margin-bottom: 24px;
padding: 24px;
background-color: #fafafb ;
`
const Container = styled.div`
text-align: left;
width:620px;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
`
const Page = styled.div`
margin: 10px;
text-align: left;
width: 100%;
height: 100%;
${ flex()};
position:relative;
`

