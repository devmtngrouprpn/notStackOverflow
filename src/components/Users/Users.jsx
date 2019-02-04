import React, { Component } from "react";
import styled from 'styled-components'
import Layout from "../Layout/Layout1.jsx";
import { connect } from 'react-redux'
import { SearchBar } from '../../utilites/globals';


import {
  P,
  H1,
  StyledLink,
  TabButton
} from "../../utilites/index.js";
import axios from "axios";

class User extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  componentDidMount = async () => {
    let res = await axios.get("/api/users/allusers");
    console.log(res.data)
    this.setState({ users: res.data })
  }
  render() {
    return (
      <>
        <Layout>
          <Content>
            <UsersH1>Users</UsersH1>
            <InfoBar>
              <SearchBox placeholder='Filter by user' />
              <ButtonContainer>
                <TabButton
                  onClick={() => this.handleView("Popular")}
                  active={this.state.view === "Popular"}
                  activeNeigbor={this.state.view === "featured"}
                  position="left"
                >
                  Popular
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("Name")}
                  active={this.state.view === "Name"}
                  activeNeigbor={this.state.view === "hot"}
                  position="mid"
                >
                  <FeaturedBox>Name</FeaturedBox>
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("New")}
                  active={this.state.view === "New"}
                  position="right"
                >
                  New
                </TabButton>
              </ButtonContainer>
            </InfoBar>
            <Grid>
              {this.state.users.map((user) => {

                return <UserContainer>
                  <Image src={`${user.picture}`} alt='image' />
                  <div>
                    <StyledCardLink to={`/users/${user.username}`}>
                      <P>{user.username}</P>
                    </StyledCardLink>
                    <Repuation>{user.reputation}</Repuation>
                    <WatchedTags>{`${user.tags_watching[0] ? user.tags_watching : ''}`}</WatchedTags>
                  </div>
                </UserContainer>
              })}
            </Grid>
          </Content>
        </Layout>
      </>
    );
  }

}
const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;
const SearchBox = styled(SearchBar)`
  border-radius: 3px;
    border-color: #bbc0c4;
    border: 1px solid lightgray;
    background-color: #fff;
    box-shadow: none;
    color: #3b4045;
    padding: 8px 9px 8px 9px;
    margin-left:0;
    max-width: 180px;
`
const InfoBar = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: nowrap;
margin-bottom: 60px;
margin-top: 25px;
`
const ButtonContainer = styled.div`
display:flex; 
flex-wrap: nowrap;
`;
const FeaturedBox = styled.div``;
const Image = styled.img`
    width: 48px;
    height: 48px;
`
const WatchedTags = styled.div`

`
const Repuation = styled.div`

`
const Username = styled.div`

`
const UserContainer = styled.div`
display:flex;
`
const UsersH1 = styled(H1)`

`
const Grid = styled.div`
display: grid;
grid-gap: 8px;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`
const Content = styled(P)`
    max-width: 1100px;
    width: calc(100% - 164px);
    background-color: #FFF;
    border-radius: 0;
    border: 1px solid #d6d9dc;
    border-top-width: 0;
    border-bottom-width: 0;
    border-left-width: 1px;
    border-right-width: 0;
    padding: 24px;
    box-sizing: border-box;
`
function mapStateToProps(reduxStore) {
  return { ...reduxStore };
}

export default connect(mapStateToProps)(User);

