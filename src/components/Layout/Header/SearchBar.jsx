import React, { Component } from "react";
import styled from "styled-components";
import {
  blueButton,
  inputBorderBlue,
  flex,
  SearchBar as SearchBox
} from "../../../utilites/index.js";

class SearchBar extends Component {
  state = {
    searchInput: ""
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <FlexBox>
          <SearchBox
            name="searchInput"
            placeholder="Search..."
            onKeyDown={this.search}
            onChange={this.handleInput}
            value={this.state.searchInput}
          />
          <SearchButton onClick={this.search}>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              color="white"
            >
              <Path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z" />
            </svg>
          </SearchButton>
        </FlexBox>
      </>
    );
  }
}

export default SearchBar;

const FlexBox = styled.div`
  ${flex("row", "flex-end")}
  width: 750px;
  max-width: 750px;
  flex-basis: 750px;
  flex-shrink: 1;
`;

const Path = styled.path`
  fill: currentColor;
`;

const SearchButton = styled.button`
  display: none;
  ${blueButton("6px 10px 2px 10px")};
  position: absolute;
  color: white;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;
