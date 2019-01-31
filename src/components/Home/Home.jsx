import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import {
  LoadingWraper,
  H1,
  blueButton,
  tabButton,
  tabButtonDarkGray,
  tabButtonBorder,
  tabButtonDarkBorder,
  tabButtonGray,
  tabButtonText,
  tabButtonTextDark
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_home } from "./../../ducks/home";

class Home extends Component {
  state = {
    interesting: [],
    loading: ""
  };
  componentDidMount() {
    this.getQuestions();
  }
  async getQuestions() {
    this.setState({ loading: true });
    let res = await axios.get(`/api/questions/interesting`);
    console.log(res.data);
    await this.setState({ interesting: res.data.interesting });
    this.setState({ loading: false });
    this.props.update_home(res.data);
  }
  render() {
    let questions = this.props;

    return (
      <LoadingWraper text loading={this.state.loading}>
        <Layout>
          <H1>Top Questions</H1>
          <AskButton>Ask Question</AskButton>
          <TabButton active={false} position="left">
            Interesting
          </TabButton>
          <TabButton active={false}>Interesting</TabButton>
          <TabButton active={false} position="right">
            Interesting
          </TabButton>
        </Layout>
      </LoadingWraper>
    );
  }
}

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const TabButton = styled.button`
  background-color: ${props => (props.active ? tabButtonDarkGray : "#fff")};
  font-family: Helvetica, san-serif;
  font-size: 13px;
  color: ${tabButtonText}
  padding: 8px 8px 8px 8px;
  border: 1px solid
    ${props => (props.active ? tabButtonDarkBorder : tabButtonBorder)};

  :hover {
    background-color: ${props =>
      props.active ? tabButtonDarkGray : tabButtonGray};
    color: ${tabButtonTextDark};
  }
`;

function mapStateToProps(state) {
  let { interesting, featured, hot, week, month } = state.home;
  return {
    interesting,
    featured,
    hot,
    week,
    month
  };
}
export default connect(
  mapStateToProps,
  { update_home }
)(Home);
