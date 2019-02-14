import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setResults } from "../../../ducks/search.js";
import { withRouter } from "react-router-dom";
import {
  blueButton,
  flex,
  SearchBar as SearchBox
} from "../../../utilites/index.js";
import axios from "axios";

class SearchBar extends Component {
  state = {
    searchInput: ""
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  search = async event => {
    console.log("it fired");
    if (event.keyCode === 13 || event.target.name === "button") {
      let res = await axios
        .get(`/api/search?search=${this.state.searchInput}`)
        .catch(err => console.log(err));
      this.props.history.push(res.data.url);
      this.props.setResults(res.data);
    }
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
          <SearchButton onClick={this.search} name="button">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              color="white"
              name="button"
              onClick={this.search}
            >
              <Path
                onClick={this.search}
                name="button"
                d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
              />
            </svg>
          </SearchButton>
        </FlexBox>
      </>
    );
  }
}

export default withRouter(
  connect(
    null,
    { setResults }
  )(SearchBar)
);

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
  opacity: 0;
  ${blueButton("6px 10px 2px 10px")};
  position: absolute;
  color: white;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;
