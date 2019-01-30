import React, { Component } from "react";
import styled from "styled-components";
import {
  blueButton,
  inputBorderBlue,
  P,
  flex
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

const SearchBox = styled.input`
  border-radius: 3px;
  border-color: #bbc0c4;
  border: 1px solid lightgray;
  background-color: #fff;
  box-shadow: none;
  color: #3b4045;
  flex-basis: 750px;
  margin-left: 12px;
  padding: 8px 9px 8px 9px;

  :focus {
    outline: none;
    border: 1px solid ${inputBorderBlue};
    box-shadow: 0 0 0 4px rgba(0, 149, 256, 0.15);
  }

  :focus + button {
    display: block;
  }

  ::placeholder {
    color: lightgray;
  }
`;
