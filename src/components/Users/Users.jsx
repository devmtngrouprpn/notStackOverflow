import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import { connect } from "react-redux";
import { SearchBar } from "../../utilites/globals";

import { P, H1, StyledLink, TabButton } from "../../utilites/index.js";
import axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      view: "reputation",
      users: []
    };
  }
  componentDidMount = async () => {
    let res = await axios.get("/api/users/allusers");
    this.setState({ users: res.data });
  };
  handleView = name => {
    this.setState({ view: name });
  };
  render() {
    return (
      <>
        <Layout>
          <Content>
            <UsersH1>Users</UsersH1>
            <InfoBar>
              <SearchBox placeholder="Filter by user" />
              <ButtonContainer>
                <TabButton
                  onClick={() => this.handleView("reputation")}
                  active={this.state.view === "reputation"}
                  activeNeigbor={this.state.view === "new users"}
                  position="left"
                >
                  repuation
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("new users")}
                  active={this.state.view === "new users"}
                  activeNeigbor={this.state.view === "voters"}
                  position="mid"
                >
                  new users
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("voters")}
                  active={this.state.view === "voters"}
                  activeNeigbor={this.state.view === "editors"}
                  position="mid"
                >
                  voters
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("editors")}
                  active={this.state.view === "editors"}
                  activeNeigbor={this.state.view === "moderators"}
                  position="mid"
                >
                  editors
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("moderators")}
                  active={this.state.view === "moderators"}
                  position="right"
                >
                  moderators
                </TabButton>
              </ButtonContainer>
            </InfoBar>
            <Grid>
              {this.state.users.map(user => {
                return (
                  <UserContainer>
                    <Flex>
                      <Image src={`${user.picture}`} alt="image" />
                      <UserInfo>
                        <StyledCardLink to={`/users/${user.username}`}>
                          <P>{user.username}</P>
                        </StyledCardLink>
                        <Location>Candada,North America</Location>
                        <Repuation>{user.reputation}</Repuation>
                      </UserInfo>
                    </Flex>
                    <WatchedTags>{`${
                      user.tags_watching[0] ? user.tags_watching : ""
                    }`}</WatchedTags>
                  </UserContainer>
                );
              })}
            </Grid>
          </Content>
        </Layout>
      </>
    );
  }
}
const Location = styled.div`
  font-size: 15px;
  margin: 2px 0 2px 0;
  color: #6a737c;
`;
const Flex = styled.div`
  display: flex;
`;
const UserInfo = styled.div`
  margin-left: 8px;
`;
const StyledCardLink = styled(StyledLink)`
  color: #07c;
  display: inline-block;
    font-size: 18px;
  /* margin-right: ${props => (props.user ? "5px" : "")}; */
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
  margin-bottom: 3px;
`;
const SearchBox = styled(SearchBar)`
  border-radius: 3px;
  border-color: #bbc0c4;
  border: 1px solid lightgray;
  background-color: #fff;
  box-shadow: none;
  color: #3b4045;
  padding: 8px 9px 8px 9px;
  margin-left: 0;
  max-width: 180px;
`;
const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-bottom: 60px;
  margin-top: 25px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
// const FeaturedBox = styled.div``;
const Image = styled.img`
  width: 48px;
  box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  border-collapse: separate;
  height: 48px;
`;
const WatchedTags = styled.div`
  color: #6a737c;
  margin-left: 56px;
  font-size: 14px;
`;
const Repuation = styled.div`
  margin-top: 6px;
  margin-bottom: 7px;
  color: #6a737c;
  font-size: 14px;
  font-weight: bold;
  margin-right: 2px;
  color: #6a737c;
`;
const UserContainer = styled.div`
  /* display:flex; */
  padding: 5px 6px 7px 7px;
`;
const UsersH1 = styled(H1)``;
const Grid = styled.div`
  display: grid;
  grid-row-gap: 8px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
const Content = styled(P)`
  max-width: 1100px;
  width: 100%;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #d6d9dc;
  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 1px;
  border-right-width: 0;
  padding: 24px;
  box-sizing: border-box;
`;
function mapStateToProps(reduxStore) {
  return { ...reduxStore };
}

export default connect(mapStateToProps)(User);
