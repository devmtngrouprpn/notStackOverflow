import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import {
  LoadingWraper,
  H1,
  blueButton,
  TabButton,
  flex
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_home } from "./../../ducks/home";

class Home extends Component {
  state = {
    view: "interesting",
    loading: false
  };
  componentDidMount() {
    this.getQuestions();
  }
  async getQuestions() {
    this.setState({ loading: true });
    let res = await axios.get(`/api/questions/interesting`);
    this.setState({ loading: false });
    console.log(res.data);
    this.props.update_home(res.data);
  }
  handleView = event => {
    let { name } = event.target;
    this.setState({ view: name });
  };
  render() {
    let questions = this.props[this.state.view].map(question => (
      <HQCard question />
    ));

    return (
      <LoadingWraper text loading={this.state.loading}>
        <Layout>
          <H1>Top Questions</H1>
          <AskButton>Ask Question</AskButton>
          <div>
            <TabButton
              onClick={this.handleView}
              name="interesting"
              active={this.state.view === "interesting"}
              activeNeigbor={this.state.view === "featured"}
              position="left"
            >
              Interesting
            </TabButton>
            <TabButton
              onClick={this.handleView}
              name="featured"
              active={this.state.view === "featured"}
              activeNeigbor={this.state.view === "hot"}
              position="mid"
            >
              Featured
            </TabButton>
            <TabButton
              onClick={this.handleView}
              name="hot"
              active={this.state.view === "hot"}
              activeNeigbor={this.state.view === "week"}
              position="mid"
            >
              Hot
            </TabButton>
            <TabButton
              onClick={this.handleView}
              name="week"
              active={this.state.view === "week"}
              activeNeigbor={this.state.view === "month"}
              position="mid"
            >
              Week
            </TabButton>
            <TabButton
              onClick={this.handleView}
              name="month"
              active={this.state.view === "month"}
              position="right"
            >
              Month
            </TabButton>
          </div>
        </Layout>
      </LoadingWraper>
    );
  }
}

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

const TabBar = styled.div`
  ${flex()}
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
