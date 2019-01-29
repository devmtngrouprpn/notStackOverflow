import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar.jsx';
import { flex } from '../../../utilites/index.js';
import { P, Logo } from '../../../utilites/globals.js';

function Header(props) {
    return (
        <FlexBox>

            <Container>
                <HeaderLogo src="http://lh3.googleusercontent.com/6AMietCWSXysmPDEiIEzXoJP2HzXYNbDHx83l42JqnX350YlyBGmwk7ithVCTIM2fbM=w300" alt="not stackoverflow logo" />
                <LogoText>not<Bold>stack</Bold>overflow</LogoText>
            </Container>

            <SearchBar />

            <div>
                userData
            </div>

            <div>
                notInbox
            </div>

            <div>
                awards
            </div>

            <div>
                help
            </div>

            <div>
                stackExchange
            </div>

        </FlexBox>
    )
}

const LogoText = styled(P)`
    font-size: 20px;
    font-family: KoHo, san-serif;
    ${flex()}
    margin-left: 5px;
`;

const Bold = styled(LogoText)`
    font-weight: bold;
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
    ${flex('row', 'space-between')}
`;

export default Header;