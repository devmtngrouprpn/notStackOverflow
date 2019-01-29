import React, { Component } from 'react';
import styled from 'styled-components';
// import { headerGrays } from '../../../utilites/index.js';


class SearchBar extends Component {

    state = {

    }


    render() {
        return (
            <>
                <SearchBox placeholder='Search...' />
            </>
        )
    }
}

export default SearchBar;

const SearchBox = styled.input`
border-radius:3px;
border-color: #BBC0C4;
border: 1px solid lightgray;
background-color: #FFF;
box-shadow: none;
color: #3b4045;
max-width: 750px;
width: 750px;
box-sizing: border-box;
margin-left:12px;
 padding: 8px 9px 8px 9px;
 ::placeholder{
     color:lightgray;
 }
`;