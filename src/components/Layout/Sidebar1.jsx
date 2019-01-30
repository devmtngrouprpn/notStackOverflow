import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { flex, colors, P, StyledLink } from '../../utilites/index.js';


function Sidebar({ match }) {

    const route = (match.path.match(/(\w+)$/) || ['home'])[0];

    return (
        <SidebarContainer>

            <SidebarLink to='/' active={route === 'home'}>
                <SidebarP>Home</SidebarP>
            </SidebarLink>

            <SidebarP margin='15px 0 3px 0' fontSize='11px'>PUBLIC</SidebarP>

            <SidebarLink indent='20px' to='/questions' active={route === 'questions'}>
                Not Stack Overflow
            </SidebarLink>

            <SidebarLink indent='20px' to='/tags' active={route === 'tags'}>
                Tags
            </SidebarLink>

            <SidebarLink indent='20px' to='/users' active={route === 'users'}>
                <SidebarP>Users</SidebarP>
            </SidebarLink>

        </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
    ${flex('column', 'center', 'flex-start')}
    padding-left: 7px;
    padding-top: 30px;
    border-right: 1px solid ${colors.borderGray};
`;

const SidebarLink = styled(StyledLink)`
    height: 30px;
    width: 164px;
    vertical-align: center;
    font-size: 13px;
    font-weight: ${props => props.active ? 'bold' : '400px'};
    color: ${props => props.active ? colors.black : ''};
    padding-left: ${props => props.indent || '0'};
    background: ${props => props.active ? colors.offWhite : ''};
    border-right: ${props => props.active ? `solid ${colors.orange} 3px` : ''};

`

const SidebarP = styled(P)`
    font-size: ${props => props.fontSize || '13px'};
    margin: ${props => props.margin || '0 0 0 0'};
    color: ${colors.textDarkGray}
`;



export default withRouter(Sidebar);