import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header.jsx';
import Sidebar from './Sidebar1.jsx';
import { flex } from '../../utilites/index.js';

function Layout(props) {
    return (
        <Grid>

            <HeaderHolder>
                <Header />
            </HeaderHolder>

            <ContentHolder>
                <StyledSidebar />
                <ChildFlexContainer>
                    {props.children}
                </ChildFlexContainer>
            </ContentHolder>

        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: 
    "header"
    "content";
`;

const StyledSidebar = styled(Sidebar)`
    flex-basis: 164px;
    flex-shrink: 0;
`
const ChildFlexContainer = styled.div`
    flex-basis: 1100px;
`

const ContentHolder = styled.div`
    grid-area: content;
    ${flex()};
`;

const HeaderHolder = styled.div`
    grid-area: header;
`;

export default Layout;