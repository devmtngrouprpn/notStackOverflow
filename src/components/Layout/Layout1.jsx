import React from "react";
import styled from "styled-components";
import Header from "./Header/Header.jsx";
import Sidebar from "./Sidebar1.jsx";
import { flex, black } from "../../utilites/index.js";

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
        <ChildFlexContainer>{props.children}</ChildFlexContainer>
      </ContentHolder>

      <FooterContainer />
    </Grid>
  );
}

const Grid = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr 272px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

const FooterContainer = styled.div`
  grid-area: footer;
  background: ${black};
  position: relative;
  top: 272px;
  z-index: 2;
`;

const SidebarContainer = styled.div`
  position: relative;
  z-index: 1;
  flex-basis: 164px;
  flex-shrink: 0;
`;

const ChildFlexContainer = styled.div`
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

export default Layout;
