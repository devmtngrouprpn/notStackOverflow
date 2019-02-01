import React from "react";
import styled from "styled-components";
import Header from "./Header/Header.jsx";
import Sidebar from "./Sidebar1.jsx";
import { flex, black } from "../../utilites/index.js";

function Layout2(props) {
  return (
    <Grid>
      <HeaderHolder>
        <Header hamburger={true} />
      </HeaderHolder>
      <ContentHolder>
        <ChildFlexContainer>{props.children}</ChildFlexContainer>
      </ContentHolder>
      <FooterContainer />
    </Grid>
  );
}

const Grid = styled.div`
position: relative;
  width: 100vw;
  min-height: 100vh;
`;

const FooterContainer = styled.div`
  /* grid-area: footer; */
  height: 272px;
  width: 100%;
  background: ${black};
  position:relative;
  z-index: 2;
`;

const SidebarContainer = styled.div`
  position: relative;
  z-index: 1;
  flex-basis: 164px;
  flex-shrink: 0;
`;

const ChildFlexContainer = styled.div`
  min-height: calc(100vh - 322px) ;
margin-top: 50px;
${flex("row", "flex-start", "flex-start")}
flex-basis: 1100px;
flex-shrink: 1;
z-index: 10;
position: relative;
`;

const ContentHolder = styled.div`
  position: relative;
  z-index: 0;
  grid-area: content;
  ${flex("row", "center", "flex-start")};
  width: 100%;
`;
const HeaderHolder = styled.div`
  width: 100%;
  grid-area: header;
  position: fixed;
  z-index: 1;
`;

export default Layout2;
