import styled from 'styled-components';
import color, { buttonBlue } from './colors'

export const P = styled.p`
    font-family: Arial, Helvetica, sans-serif;
`;

export const Logo = styled.img`
    transform: scaleX(-1) rotate(126deg);
`;
export const blueButton = (padding = '8px 10px 8px 10px') => (
    `
    background-color: ${buttonBlue}
    color: white;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 #66bfff;
    padding: ${padding}
    outline: none;
    font-size: 13px;
    border: 1px solid #07c
    `
);



export default {
    P,
    Logo,
    blueButton
};