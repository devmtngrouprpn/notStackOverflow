import React, { Component } from "react";
import styled from "styled-components";
import { P, StyledLink, timeFunction } from "./index";

class UserTag extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    let { question } = this.props;
    let difference = timeFunction(question.question_creation_timestamp);
    return (
      <>
        <AskedLink to={`/questions/${question.question_id}`}>
          {difference}
        </AskedLink>
        <br />
        {/* {difference} */}
        <UserInfo>
          <ProPic src={question.picture} alt="" />
          <UserName>
            <StyledCardLink user={true} to={`/users/${question.username}`}>
              <P>{question.username}</P>
            </StyledCardLink>{" "}
            <UserBadges>
              <RepP>
                {question.reputation > 1000
                  ? `${(question.reputation / 1000).toFixed(1)}k`
                  : question.reputation}
              </RepP>
              <Gold> ● </Gold>
              <BadgeP> 4</BadgeP>
              <Silver> ● </Silver>
              <BadgeP> 3</BadgeP>
              <Bronze> ● </Bronze>
              <BadgeP> 8</BadgeP>
            </UserBadges>
          </UserName>
        </UserInfo>
      </>
    );
  }
}
const UserInfo = styled(P)`
  display: flex;
  flex-direction: row;
`;
const ProPic = styled.img`
  border-radius: 1.5px;
  width: 32px;
  height: 32px;
  margin: 0;
  -webkit-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  -moz-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
`;
const UserName = styled(P)`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  font-weight: 400;
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;
const Bronze = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: brown;
  font-weight: 550;
  padding-left: 8px;
  display: flex;
  padding-right: 2.5px;
`;
const Silver = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: silver;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;
const Gold = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: gold;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;

const UserBadges = styled(P)`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
  /* margin-left: 8px; */
`;
const AskedLink = styled(StyledLink)`
  color: #9199a1;
  font-size: 12px;
  margin-right: 5px;
  :hover {
    color: #07c;
  }
  margin-bottom: 2px;
`;
const RepP = styled(P)`
  font-weight: bold;
  font-size: 12px;
  margin-right: 2px;
  color: #848d95;
`;
const BadgeP = styled.p`
  font-weight: 400;
  font-size: 12px;
  padding-left: 0;
  color: #6a737c;
`;

export default UserTag;
