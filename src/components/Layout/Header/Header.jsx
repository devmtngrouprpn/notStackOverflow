import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar.jsx';
import { flex, orange, offWhite, svgColor } from '../../../utilites/index.js';
import { P, Logo } from '../../../utilites/globals.js';
import LogFunctions from './LogFunctions'

function name(props) {

    return (
        <FlexBox>
            <Holder>
                <Container>
                    <HeaderLogo src="http://lh3.googleusercontent.com/6AMietCWSXysmPDEiIEzXoJP2HzXYNbDHx83l42JqnX350YlyBGmwk7ithVCTIM2fbM=w300" alt="not stackoverflow logo" />
                    <LogoText>not<Bold>stack</Bold>overflow</LogoText>
                </Container>

                <SearchBar />
                {/* 
                <div>
                    userData
            </div> */}
                <IconWrapper>
                    <SvgWrapper>
                        <svg aria-hidden="true" width="20" height="18" viewBox="0 0 20 18"><Path d="M15.19 1H4.63c-.85 0-1.6.54-1.85 1.35L0 10.79V15c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-4.21l-2.87-8.44A2 2 0 0 0 15.19 1zm-.28 10l-2 2h-6l-2-2H1.96L4.4 3.68A1 1 0 0 1 5.35 3h9.12a1 1 0 0 1 .95.68L17.86 11h-2.95z"></Path></svg>
                    </SvgWrapper>
                    <SvgWrapper>
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3zM3 7c-.5 0-1-.5-1-1V4h1v3zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1zM16 6c0 .5-.5 1-1 1V4h1v2z"></Path></svg>
                    </SvgWrapper>
                    <SvgWrapper>
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23zM11.77 8a5.8 5.8 0 0 1-1.02.91l-.53.37c-.26.2-.42.43-.5.69a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.03-.66.12-1.21.4-1.66a5.29 5.29 0 0 1 1.43-1.22c.16-.12.28-.25.38-.39a1.34 1.34 0 0 0 .02-1.71c-.24-.31-.51-.46-1.03-.46-.51 0-.8.26-1.02.6-.21.33-.18.73-.18 1.1H5.75c0-1.38.35-2.25 1.1-2.76.52-.35 1.17-.5 1.93-.5 1 0 1.79.18 2.49.71.64.5.98 1.18.98 2.12 0 .57-.2 1.05-.48 1.44z"></Path></svg>
                    </SvgWrapper>
                    <SvgWrapper>
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><Path d="M1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2zM15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2zM1 6h16v4H1V6z"></Path></svg>
                    </SvgWrapper>
                    <LogFunctions />
                </IconWrapper>
            </Holder>
        </FlexBox>
    )
}
const IconWrapper = styled.div`
padding-left:48px;
${flex()}
`
const Path = styled.path`
fill: currentColor;
color: svgColor;
`
const SvgWrapper = styled.div`
color: ${svgColor};
padding:10px;
height: 50px;
box-sizing: border-box;
${flex('row', 'center')}

:hover{
    background-color:red;
    cursor:pointer;
}
`
const LogoText = styled(P)`
font-weight: 550;

    font-size: 20px;
    font-family: KoHo, san-serif;
    ${flex()}
    margin-left: 5px;
`;
const Holder = styled.div`
width: inherit;
height: inherit;
${flex()};
max-width: 1264px;
`;
const Bold = styled(LogoText)`
    font-weight: 900;
    margin: initial;
`;

const Container = styled.div`
    ${flex()}
`;

const HeaderLogo = styled(Logo)`
height: 25px;
    width: 25px;
`;

const FlexBox = styled.div`
    ${flex('row')};
    border-top: 3px solid ${orange};
    height: 50px;
    background-color: ${offWhite};
    box-sizing: border-box;
    box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
`;
export default name;