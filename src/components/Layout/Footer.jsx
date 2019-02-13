import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
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
  async SendMail() {
    let res = await axios.get("/send/mail");
    console.log("Sending");
    alert(res.data.msg);
  }
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
            <SiteFooterTitle href="https://stackoverflow.com/">
              NOTSTACK OVERFLOW
            </SiteFooterTitle>
            <SiteFooterLink href="https://stackoverflow.com/questions">
              Questions
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/jobs">
              Jobs
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/jobs/directory/developer-jobs">
              Developer Jobs Directory
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/jobs/salary">
              Salary Calculahrefr
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/help">
              Help
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/?__=1114576337">
              Mobile
            </SiteFooterLink>
            <SiteFooterLink href="">Enable Responsiveness</SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle href="https://www.stackoverflowbusiness.com/">
              PRODUCTS
            </SiteFooterTitle>
            <SiteFooterLink href="https://stackoverflow.com/teams">
              Team
            </SiteFooterLink>
            <SiteFooterLink href="https://www.stackoverflowbusiness.com/talent">
              Talent
            </SiteFooterLink>
            <SiteFooterLink href="https://www.stackoverflowbusiness.com/advertise">
              Engagement
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/enterprise">
              Enterprise
            </SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle href="https://stackoverflow.com/company/about">
              COMPANY
            </SiteFooterTitle>
            <SiteFooterLink href="https://stackoverflow.com/company/about">
              About
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/company/press">
              Press
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/company/work-here">
              Work Here
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/legal">
              Legal
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/legal/privacy-policy">
              Privacy Policy
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/company/contact">
              Contact Us
            </SiteFooterLink>
          </Stack>
          <Stack>
            <SiteFooterTitle>
              NOTSTACK EXCHANGE <br /> NETWORK
            </SiteFooterTitle>
            <SiteFooterLink href="https://stackoverflow.com/questions?sort=newest#">
              Technology
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/questions?sort=newest#">
              Life / Arts
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/questions?sort=newest#">
              Culture / Recreation
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/questions?sort=newest#">
              Science
            </SiteFooterLink>
            <SiteFooterLink href="https://stackoverflow.com/questions?sort=newest#">
              Other
            </SiteFooterLink>
          </Stack>
          <SiteFooterCopyright>
            <SiteFooterList>
              <SiteFooterLink href="https://stackoverflow.blog/?blb=1">
                Blog
              </SiteFooterLink>
              <SiteFooterLink href="https://www.facebook.com/officialstackoverflow/">
                Facebook
              </SiteFooterLink>
              <SiteFooterLink href="https://twitter.com/stackoverflow">
                Twitter
              </SiteFooterLink>
              <SiteFooterLink href="https://linkedin.com/company/stack-overflow">
                LinkedIn
              </SiteFooterLink>
            </SiteFooterList>
            <SiteFooterLink onClick={() => this.SendMail()}>
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
  justify-content: space-evenly;
  width: 70vw;
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
  width: 100vw;
`;
const SiteFooterLink = styled.a`
  color: #848d95;
  padding: 4px 0;
  line-height: 1.30769231;
  text-decoration: none;
  padding-right: 10px;
  font-size: 13px;
  :hover {
    cursor: pointer;
    color: #bbc0c4;
    text-decoration: none;
  }
`;
const SiteFooterTitle = styled(H1)`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 12px;
  color: #bbc0c4;
  font-size: 0.83em;
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
  margin: 0px 0 42px 0;
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
