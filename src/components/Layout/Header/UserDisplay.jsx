import React, { Component } from 'react';
import styled from 'styled-components'
import { } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import { flex, orange } from '../../../utilites/index.js';


let picture
class UserDisplay extends Component {
    async componentDidMount() {
    }

    render() {
        if (this.props.user.picture) {
            picture = this.props.user.picture
        }
        return (
            this.props.user.username ?
                <>
                    <ImageWrapper>
                        <Image src={this.props.user.picture} height='24' width='24' />
                        <Repuation>{this.props.user.reputation}</Repuation>
                        <Bronze>●8</Bronze>
                        <Silver>●3</Silver>
                        <Gold>●2</Gold>
                    </ImageWrapper>
                </> :
                <></>
        )
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, {})(UserDisplay);
const Image = styled.img`
background-image: '${picture}'
`
const ImageWrapper = styled.div`
${flex()}
height: 50px;
padding:0 10px 0 10px;
:hover{
    border-top: 1px solid ${orange};
    background-color: #eff0f1;
    color: #3b4045;
    text-decoration: none;
    cursor: pointer;
}
`
const Bronze = styled.div`
font-size: 14px;
font-weight: 0;
color: brown;
font-weight: 550;
padding-left: 8px;
`
const Silver = styled.div`
font-size: 14px;
font-weight: 0;
color: silver;
font-weight: 550;
padding-left: 8px;
`
const Gold = styled.div`
font-size: 14px;
font-weight: 0;
color: gold;
font-weight: 550;
padding-left: 8px;
`
const Repuation = styled.div`
font-size: 16px;
font-weight: 550;
padding-left: 8px;
`