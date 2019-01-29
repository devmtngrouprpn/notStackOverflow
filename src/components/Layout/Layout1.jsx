import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header.jsx';
import Sidebar from './Sidebar1.jsx';

function Layout(props) {
    return (
        <Grid>

            <HeaderHolder>
                <Header />
            </HeaderHolder>

            <SidebarHolder>
                <Sidebar />
            </SidebarHolder>

            <ChildHolder>
                {props.children}
            </ChildHolder>

        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 150px 1fr;
    grid-template-areas: 
    "header header"
    "sidebar children";
`;

const ChildHolder = styled.div`
    grid-area: children;
`

const HeaderHolder = styled.div`
    grid-area: header;
`

const SidebarHolder = styled.div`
    grid-area: sidebar;
`

export default Layout;