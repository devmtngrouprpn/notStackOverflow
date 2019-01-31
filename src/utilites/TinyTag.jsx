import React, { Component } from 'react'
import { P } from "../utilites/globals.js";
import styled from 'styled-components'
import { LoadingWraper } from '../utilites/index'
import axios from 'axios'
import { debounce } from 'lodash'
export default class TinyTag extends Component {
    constructor() {
        super()
        this.state = {
            information: false,
            hovering: false,
            bounce: debounce(this.runCall, 300, {
                'leading': false,
                'trailing': true
            }),
            stilWant: false
        }
    }
    runCall = async () => {
        let res = await axios.post("/api/tags/tinytag", { subject: this.props.subject })
        console.log(res.data)
        this.setState({ information: res.data })
    }
    makeCall = async () => {
        await this.setState({ hovering: true, stillWant: true })
        this.state.bounce()

    }
    leaving = () => {
        this.setState({ information: false, hovering: false, stillWant: false });
    }
    render() {
        if (!this.state.hovering) {
            this.state.bounce.cancel()
        }
        return (
            <Relative
                onMouseEnter={this.makeCall}
                onMouseLeave={this.leaving}
            >
                <Subject
                >{this.props.subject}
                    {
                        this.state.stillWant && this.state.information ?
                            <DropDown
                            >
                                <WhiteSquare
                                    onMouseEnter={this.makeCall}
                                    onMouseLeave={this.leaving}
                                />
                                <TitleSpan>
                                    <span>
                                        <svg aria-hidden="true" class="svg-icon va-text-top iconFire" width="18" height="18" viewBox="0 0 18 18"><path d="M7.48.01c.87 2.4.44 3.74-.57 4.77-1.06 1.16-2.76 2.02-3.93 3.7C1.4 10.76 1.13 15.72 6.8 17c-2.38-1.28-2.9-5-.32-7.3-.66 2.24.57 3.67 2.1 3.16 1.5-.52 2.5.58 2.46 1.84-.02.86-.33 1.6-1.22 2A6.17 6.17 0 0 0 15 10.56c0-3.14-2.74-3.56-1.36-6.2-1.64.14-2.2 1.24-2.04 3.03.1 1.2-1.11 2-2.02 1.47-.73-.45-.72-1.31-.07-1.96 1.36-1.36 1.9-4.52-2.03-6.88L7.45 0l.03.01z"></path></svg>
                                        {' 1'} watchers
                                    </span>
                                    <span>
                                        {' 13'} questions
                                    </span>
                                </TitleSpan>
                                {this.state.information.name} views: {this.state.information.tag_views} desc: {this.state.information.description}
                                <ButtonHolder>
                                    <WatchButton>SVG Watch Tag</WatchButton>
                                    {/* <UnWatchButton>SVG UnWatch Tag</UnWatchButton> */}
                                    <IgnoreButton>SVG Ignore Tag</IgnoreButton>
                                </ButtonHolder>
                            </DropDown>
                            :
                            <></>
                    }
                </Subject>


            </Relative >
        )
    }
}
const WhiteSquare = styled.div`
position: absolute;
background: white;
border-top-left-radius: 2px;
top: -7px;
left: 168px;
height: 12px;
width: 12px;
transform: rotate(45deg);
z-index: 10;
border-top: 1px solid black;
border-left: 1px solid black;
`
const ButtonHolder = styled.div`

`
const TitleSpan = styled.div`

`
const WatchButton = styled.div`

`
const IgnoreButton = styled.div`

`
const Relative = styled.div`
position: relative;
min-width: 12px;
max-width: 40px;
margin: 5px;
`
let DropDown = styled.div`
margin: 5px;
padding: 12px 15px 12px 15px;
box-shadow: 0px 2px 5px 1px lightgray;
border-radius: 3px;
white-space: pre-wrap;
z-index: 9;
right:-140px;           
top: 30px;
background:white;
position:absolute;
max-height:290px;
width:348px;;
border: 1px solid black;
transition:1s;
animation: .25s ease-in 0s 1 exist;

@keyframes slideInFromLeft {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
@keyframes exist {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
`
const Subject = styled(P)`
position:relative;
white-space: nowrap;
    font-size: 14px;
    border-radius: 3px;
    padding: 5px 6px 5px 6px;
    color: #39739d;
    background-color: #E1ECF4;
    border-color: #E1ECF4;
    width: fit-content;
    transition: .25s;
    margin: 2px 2px 2px 0;
    :hover{
      color:  #33658a;
    background-color: #cee0ed;
    border-color: #cee0ed;
    
    cursor:pointer;
    }
`
