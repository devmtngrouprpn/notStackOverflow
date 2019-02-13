import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import axios from "axios";
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1,
  tabButtonDarkGray,
  tabButtonTextDark,
  tabButtonText,
  tabButtonDarkBorder,
  tabButtonBorder,
  tabButtonGray,
  timeFunction,
  P
} from "../../utilites/index.js";
import styled from "styled-components";

export default class UsersId extends Component {
  state = {
    userId: this.props.match.params.id,
    loading: false,
    userInfo: "",
    Created: "",
    LastLog: ""
  };

  componentDidMount = async () => {
    await this.getUserData();
    // call for data useing props.match.params.id as the query
  };
  // async getUserData() {
  //   let res = await axios.get(`/api/user/indv?user_id=${this.state.userId}`);
  //   console.log(res.data.basicData[0]);
  //   let Created = timeFunction(res.data.basicData[0].user_created);
  //   let LastLog = timeFunction(res.data.basicData[0].last_logout);
  //   this.setState({
  //     userInfo: res.data.basicData[0],
  //     Created: Created,
  //     LastLog: LastLog
  //   });
  // }
  async getUserData(userId) {
    let res = await axios.get(`/api/user/indv?user_id=${userId}`);
    // console.log(res.data.basicData[0].username);
  }

  render() {
    this.getUserData("user1");
    let {
      answers,
      auth_id,
      bio,
      facebook,
      favorites,
      git_hub,
      last_logout,
      location,
      occupation,
      people_reached,
      personal_site,
      picture,
      questions,
      reputation,
      tags_watching,
      twitter,
      user_created,
      user_first_last,
      user_views,
      username
    } = this.state.userInfo;
    let { Created, LastLog } = this.state;

    console.log(user_created);
    return (
      <LoadingWraper loading={this.state.loading}>
        <Layout>
          <UserPage style={{ border: "1px red solid" }}>
            <TabButton>
              <H1>User Page {this.state.userId}</H1>
            </TabButton>
            <UserInfoBioPart>
              <PictureFrame>
                <GrayHalfBack />
                <ProfilePicture src={picture} alt="" />
                <Reputation>
                  {reputation} <ReputationText>REPUTATION</ReputationText>
                </Reputation>
                <BadgeAwardBox>
                  <GoldBox>
                    <GoldBall>●</GoldBall>4
                  </GoldBox>
                  <SilverBox>
                    <SilverBall>●</SilverBall>10
                  </SilverBox>
                  <BronzeBox>
                    <BronzeBall>●</BronzeBall>13
                  </BronzeBox>
                </BadgeAwardBox>
              </PictureFrame>
              <BioPart>
                <Username>{username}</Username>
                {bio === ""
                  ? "Apparently, this user prefers to keep an air of mystery about them." ||
                    "Oh Hello There"
                  : bio}
              </BioPart>
              <ContactPart>
                <Reach>
                  <ReachIndv>
                    {" "}
                    {answers}
                    <P>answers</P>{" "}
                  </ReachIndv>
                  <ReachIndv>
                    {questions} <P>questions</P>
                  </ReachIndv>
                  <ReachIndv>
                    ~{people_reached} <P>people reached</P>
                  </ReachIndv>
                </Reach>
                {Created}
                <br />
                {user_views}
                <br />
                {LastLog}
              </ContactPart>
            </UserInfoBioPart>
            {answers}
            {auth_id}
            {bio}
            {facebook}
            {favorites}
            {git_hub}
            {last_logout}
            {location}
            {occupation}
            {people_reached}
            {personal_site}
            {picture}
            {questions}
            {reputation}
            {tags_watching}
            {twitter}
            {user_created}
            {user_first_last}
            {user_views}
            {username}
          </UserPage>
        </Layout>
      </LoadingWraper>
    );
  }
}
const Username = styled.h1`
  font-weight: 600;
  font-size: 1.3em;
  margin: 6px;
  margin-bottom: 5%;
  margin-top: 0;
  color: black;
`;
const ContactPart = styled.div`
  border: 2px solid red;
  height: 100%;
  margin: 12px;
  padding: 12px;
`;
const Reach = styled.div`
  border: 2px solid green;
  display: flex;
  flex-direction: row;
`;
const ReachIndv = styled.div`
  border: 2px solid yellow;
  display: flex;
  height: 50px;
  flex-direction: column;
`;
const UserPage = styled.div`
  width: 80vw;
`;
const UserInfoBioPart = styled.div`
  width: 100%;
  display: flex;
`;
const BioPart = styled.div`
  border: 2px solid red;
  height: 100%;
  margin: 12px;
  padding: 12px;
  /* margin-right: 10%; */
  width: 45%;
  color: #6a737c !important;
`;
const PictureFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 12px;
  border: 1px solid #e4e6e8;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  box-sizing: border-box;
  cursor: pointer;
  transition: box-shadow 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
  text-align: center !important;
  align-items: center;
  margin: 12px;
  width: 16.2051282rem !important;
  flex-shrink: 0;
  /* height: 350px; */
`;
const ProfilePicture = styled.img`
  width: 164px;
  height: 164px;
  border-radius: 3px;
  margin: 0 auto;
  padding: 5%;
`;
const Reputation = styled.div`
  margin: 16%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  color: #0c0d0e !important;
  /* font-size: 1.61538462rem !important; */
`;
const ReputationText = styled.h1`
  color: #6a737c !important;
  font-size: 11px !important;
  margin-left: 9%;
`;
const BadgeAwardBox = styled.div`
  display: flex;
  flex: 1 auto;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  margin-bottom: 5%;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const GoldBox = styled.div`
  display: flex;
  background-color: #fffae6;
  border: 1px solid #ece5c6;
  box-sizing: border-box;
  /* border: 1px solid transparent; */
  border-radius: 2px;
  padding: 4px 8px;
  align-items: center !important;
  margin: 2%;
  font-weight: 700;
  color: #535a60;
`;
const GoldBall = styled.h3`
  margin-right: 5px;
  color: gold;
`;
const SilverBox = styled.div`
  display: flex;
  background-color: #eaebec;
  border: 1px solid #dddee0;
  box-sizing: border-box;
  /* border: 1px solid transparent; */
  border-radius: 2px;
  padding: 4px 8px;
  align-items: center !important;
  margin: 2%;
  font-weight: 700;
  color: #535a60;
`;
const SilverBall = styled.h3`
  margin-right: 5px;
  color: silver;
`;
const BronzeBox = styled.div`
  display: flex;
  background-color: #f8e9dd;
  border: 1px solid #f0decb;
  box-sizing: border-box;
  /* border: 1px solid transparent; */
  border-radius: 2px;
  padding: 4px 8px;
  align-items: center !important;
  margin: 2%;
  font-weight: 700;
  color: #535a60;
`;
const BronzeBall = styled.h3`
  margin-right: 5px;
  color: #cd7f32;
`;
const GrayHalfBack = styled.div`
  /* z-index: -1; */
  height: 50%;
  width: 100%;
  color: gray;
`;

const TabButton = styled.button`
  background-color: ${props => (props.active ? tabButtonDarkGray : "#fff")};
  font-family: Helvetica, san-serif;
  font-size: 13px;
  color: ${props => (props.active ? tabButtonTextDark : tabButtonText)};
  padding: 8px 8px 8px 8px;
  border: 1px solid
    ${props => (props.active ? tabButtonDarkBorder : tabButtonBorder)};
  border-top-right-radius: ${props =>
    props.position === "left" || props.position === "mid" ? "0px" : "3px"};
  border-bottom-right-radius: ${props =>
    props.position === "left" || props.position === "mid" ? "0px" : "3px"};
  border-top-left-radius: ${props =>
    props.position === "right" || props.position === "mid" ? "0px" : "3px"};
  border-bottom-left-radius: ${props =>
    props.position === "right" || props.position === "mid" ? "0px" : "3px"};
  border-left: ${props =>
    props.position !== "left" && !props.active ? "none" : ""};
  border-right: ${props => (props.activeNeigbor ? "none" : "")};
  :hover {
    background-color: ${props =>
      props.active ? tabButtonDarkGray : tabButtonGray};
    color: ${tabButtonTextDark};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(145, 153, 161, 0.1);
  }
`;
