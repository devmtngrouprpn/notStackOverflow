import React, { Component } from "react";
import styled from "styled-components";
import {
  LoadingWraper,
  H1,
  blueButton,
  TabButton,
  flex,
  featuredBoxBlue,
  Page,
  Adds,
  Content,
  borderGray
} from "./index";

class Ads extends Component {
  render() {
    let Ads = num => {
      num = Math.floor(Math.random() * 10);
      num = 4;
      let API = [
        {
          name: "Pear Theraputics",
          logo:
            "https://media.licdn.com/dms/image/C560BAQFKS8tiOjNJ0Q/company-logo_200_200/0?e=2159024400&v=beta&t=M6jBm3X9Q_pkJvZ5Z5V8PtEGtbPrg0RIfZ4Lx5ijWVo",
          location: "San Fransico, CA",
          industry: "BioTechnology",
          private: true,
          size: 51 - 200,
          techStack: []
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];
      console.log(API[0].logo);
      let { name, logo } = API[0];
      return (
        <FullAd>
          <AdHeader>
            <CompLogo src={logo} alt="Inc" /> Ryan Inc
          </AdHeader>
          <>4</>
          <></>
          <></>
        </FullAd>
      );
    };
    return <>{Ads()}</>;
  }
}
const FullAd = styled.div`
  height: 600px;
  position: relative;
  border: 1px solid #d6d9dc;
  margin-bottom: 18px;
  background-color: #fff;
  border: 1px red solid;
`;
const AdHeader = styled.div``;
const CompLogo = styled.img`
  border-radius: 1.5px;
  width: 32px;
  height: 32px;
  margin: 0;
  -webkit-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  -moz-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
`;

export default Ads;
