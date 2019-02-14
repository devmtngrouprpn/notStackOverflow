import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setResults } from "../../ducks/search.js";
import { Link } from "react-router-dom";
import VQcard from "../Questions/VQCard.jsx";
import Layout from "../Layout/Layout1.jsx";
import {
  blueButton,
  Page,
  P,
  Adds,
  Content,
  LoadingWraper,
  TabButton,
  flex,
  featuredBoxBlue,
  colors,
  H1,
  SearchBar,
  borderGray
} from "../../utilites/index.js";
import Ads from "../../utilites/SideBar/Ads.jsx";
import axios from "axios";

class SearchResults extends Component {
  state = {
    searchInput: ""
  };

  search = async event => {
    if (event.keyCode === 13 || event.target.name === "button") {
      const res = await axios
        .get(`/api/search?search=${this.state.searchInput}`)
        .catch(err => console.log(err));
      this.props.history.push(res.data.url);
      this.props.setResults(res.data);
    }
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <Layout>
          <Page>
            <Content2>
              <HeaderContainer>
                <H1>Search Results</H1>
                <Link to="/create-question">
                  <AskButton>Ask Question</AskButton>
                </Link>
              </HeaderContainer>
              <ResP>Results for Searching {this.props.searchString}</ResP>
              <HeaderContainer>
                <SearchBox
                  placeholder="Search..."
                  onChange={this.handleInput}
                  onKeyDown={this.search}
                  name="searchInput"
                  value={this.state.searchInput}
                />
                <AskButton name="button" onClick={this.search}>
                  Search
                </AskButton>
              </HeaderContainer>
              <SortBar>
                <P>{this.props.total} results</P>
                <ButtonContainer>
                  <TabButton2 active={true} position="left">
                    Relavance
                  </TabButton2>
                </ButtonContainer>
              </SortBar>
              <Questions>
                {this.props.questions.map(question => (
                  <VQcard question={question} />
                ))}
              </Questions>
            </Content2>
            <Adds>
              {" "}
              <Ads />{" "}
            </Adds>
          </Page>
        </Layout>
      </>
    );
  }
}

const Questions = styled.div`
  border-top: 1px solid ${borderGray};
`;

const TabButton2 = styled(TabButton)`
  border-radius: 3px;
  margin-right: -24px;
`;

const ResP = styled(P)`
  margin-left: 24px;
  color: #6a737c;
  font-size: 12px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: -15px;
`;

const SearchBox = styled(SearchBar)`
  margin-left: 0px;
  margin-right: 10px;
  padding: 12px;
`;

const HeaderContainer = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin-left: 24px;
  margin-top: 24px;
  max-width: 727px;
`;

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const ButtonContainer = styled.div`
  ${flex("row", "flex-end")}
  margin: 0 24px 24px 16px;
`;

const SortBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  margin-right: 0px;
  margin-bottom: 0px;
`;

const Content2 = styled(Content)`
  margin-right: -24px;
`;

function mapStateToProps(state) {
  const { questions, searchString, total } = state.search;
  return {
    questions,
    searchString,
    total
  };
}

export default connect(
  mapStateToProps,
  { setResults }
)(SearchResults);
