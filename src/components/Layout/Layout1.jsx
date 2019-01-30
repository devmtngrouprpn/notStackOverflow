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
                <SidebarContainer>
                    <Sidebar />
                </SidebarContainer>
                <ChildFlexContainer>
                    {props.children}
                </ChildFlexContainer>
            </ContentHolder>

        </Grid>
    )
}

const Grid = styled.div`
    height: 130vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: 
    "header"
    "content";
`;

const SidebarContainer = styled.div`
    position: fixed;
    z-index: 1;
`

const ChildFlexContainer = styled.div`
    flex-basis: 1100px;
    position: relative;
    left: 164px;
    z-index: 0;
`;

const ContentHolder = styled.div`
    grid-area: content;
    ${flex('row', 'flex-start', 'flex-start')};
`;
const HeaderHolder = styled.div`
width: 100%;
    grid-area: header;
    position: fixed;
    z-index: 1;
`;

export default Layout;