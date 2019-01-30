import styled from "styled-components";
import { Link } from "react-router-dom";
import { textDarkGray, black, buttonBlue } from "./colors.js";

export const Logo = styled.img`
  transform: scaleX(-1) rotate(126deg);
`;

export const blueButton = (padding = "8px 10px 8px 10px") =>
  `
    background-color: ${buttonBlue}
    color: white;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 #66bfff;
    padding: ${padding}
    outline: none;
    font-size: 13px;
    border: 1px solid #07c
    white-space: nowrap;
    :hover{
        color: rgba(255,255,255,0.9);
        background-color: #07c;
        border-color: #005999;
        box-shadow: inset 0 1px 0 #3af;
    }
    `;

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-family: Helvetica, sans-serif;
    color: ${textDarkGray};
    :hover {
        color: ${black};
    }
`;

export const P = styled.p`
  font-family: Helvetica, sans-serif;
`;



export default {
<<<<<<< HEAD
  P,
  Logo,
  StyledLink,
  blueButton
};
=======
    P,
    Logo,
    StyledLink,
    blueButton,
};

>>>>>>> master
