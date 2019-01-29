import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors, { textDarkGray, black, offWhite } from './colors.js';

export const P = styled.p`
    font-family: Helvetica, sans-serif;
`;

export const Logo = styled.img`
    transform: scaleX(-1) rotate(126deg);
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-family: Helvetica, sans-serif;
    color: ${textDarkGray}
    :hover {
        color: ${black};
    }
`;

export default {
    P,
    Logo,
    StyledLink,
};