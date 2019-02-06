import React, { Component } from "react";
import styled from "styled-components";
// import Logo from "./../../assets/NotStackOverFlowLogo.png";
import {
  P,
  hrGray,
  flex,
  tenKViews,
  oneKViews,
  TinyTag,
  green,
  questionBoxGray,
  H1,
  H2,
  StyledLink,
  textLightGray,
  Logo
} from "./../../utilites/index";
// import Logo from "./../../utilites/globals";

class Foooter extends Component {
  render() {
    return (
      <SiteFooter>
        <SiteFooterContainer>
          <SiteFooterLogo>
            <FooterLogo
              src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a"
              alt=""
            />
          </SiteFooterLogo>
          <Stack>
            <SiteFooterTitle to="">NOTSTACK OVERFLOW</SiteFooterTitle>
            <SiteFooterLink to="">Questions</SiteFooterLink>
            <SiteFooterLink to="">Jobs</SiteFooterLink>
            <SiteFooterLink to="">Developer Jobs Directory</SiteFooterLink>
            <SiteFooterLink to="">Salary Calculator</SiteFooterLink>
            <SiteFooterLink to="">Help</SiteFooterLink>
            <SiteFooterLink to="">Mobile</SiteFooterLink>
            <SiteFooterLink to="">Enable Responsiveness</SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle to="">PRODUCTS</SiteFooterTitle>
            <SiteFooterLink to="">Team</SiteFooterLink>
            <SiteFooterLink to="">Talent</SiteFooterLink>
            <SiteFooterLink to="">Engagement</SiteFooterLink>
            <SiteFooterLink to="">Enterprise</SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle to="">COMPANY</SiteFooterTitle>
            <SiteFooterLink to="">About</SiteFooterLink>
            <SiteFooterLink to="">Press</SiteFooterLink>
            <SiteFooterLink to="">Work Here</SiteFooterLink>
            <SiteFooterLink to="">Legal</SiteFooterLink>
            <SiteFooterLink to="">Privacy Policy</SiteFooterLink>
            <SiteFooterLink to="">Contact Us</SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle>
              NOTSTACK EXCHANGE <br /> NETWORK
            </SiteFooterTitle>
            <SiteFooterLink to="">Technology</SiteFooterLink>
            <SiteFooterLink to="">Life / Arts</SiteFooterLink>
            <SiteFooterLink to="">Culture / Recreation</SiteFooterLink>
            <SiteFooterLink to="">Science</SiteFooterLink>
            <SiteFooterLink to="">Other</SiteFooterLink>
          </Stack>
          <SiteFooterCopyright>
            <SiteFooterList>
              <SiteFooterLink to="">Blog</SiteFooterLink>
              <SiteFooterLink to="">Facebook</SiteFooterLink>
              <SiteFooterLink to="">Twitter</SiteFooterLink>
              <SiteFooterLink to="">LinkedIn</SiteFooterLink>
            </SiteFooterList>
            <SiteFooterLink to="">
              site design / logo © 2019 Stack Exchange Inc; user contributions
              licensed under cc by-sa 3.0 with attribution required. rev
              2019.2.5.32815
            </SiteFooterLink>
          </SiteFooterCopyright>
        </SiteFooterContainer>
      </SiteFooter>
    );
  }
}
const Stack = styled(P)`
  color: white;
  padding: 12px 50px 24px 0;
  /* flex: 1 0 auto; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const SiteFooterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 32px 12px 12px 12px;
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-evenly; */
`;
const SiteFooter = styled.div`
  background-color: #242729;
  background-image: none;
  /* background-position: top left; */
  background-repeat: no-repeat;
  border-top: 0;
  /* background-size: auto; */
  color: #6a737c;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  width: 90vw;
`;
const SiteFooterLink = styled(StyledLink)`
  color: #848d95;
  padding: 4px 0;
  line-height: 1.30769231;
  text-decoration: none;
  padding-right: 10px;
  :hover {
    cursor: pointer;
    color: #bbc0c4;
    text-decoration: none;
  }
`;
const SiteFooterTitle = styled(H2)`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 12px;
  color: #bbc0c4;
  line-height: 1.30769231;
  max-width: 230px;
  position: relative;
  padding-right: 18px;
  :hover {
    cursor: pointer;
    color: #f2f3f3;
  }
`;
const FooterLogo = styled(Logo)`
  max-width: 50px;
  height: 50px;
  padding-right: 5;
`;
const SiteFooterLogo = styled.div`
  flex: 0 0 64px;
  margin: -12px 0 32px 0;
`;
const SiteFooterCopyright = styled.div`
  flex: 1 1 150px;
  display: flex;
  flex-direction: column;
`;
const SiteFooterList = styled.ul`
  margin: 0;
  display: flex;
  list-style: none;
  margin-bottom: 110px !important;
  /* justify-content: space-around; */
`;
export default Foooter;
