import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import {
  blueButton,
  flex,
  featuredBoxBlue,
  borderGray
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_home } from "./../../ducks/questions";

class Home extends Component {
  state = {
    view: "interesting",
    loading: true
  };
  componentDidMount() {
    this.getQuestions();
  }
  async getQuestions() {
    let res = await axios.get(`/api/questions/world`);
    this.props.update_home(res.data);
    this.setState({ loading: false });
    // console.log(res.data);
  }
  handleView = name => {
    this.setState({ view: name });
  };
  render() {
    let questions = this.props[this.state.view].map(question => (
      <HQCard question={question} />
    ));

    return (
      <Layout>
        <h1>Questions</h1>
      </Layout>
    );
  }
}

const Questions = styled.div`
  border-top: 1px solid ${borderGray};
`;

const HeaderContainer = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin: 24px;
  max-width: 727px;
`;

const ButtonContainer = styled.div`
  ${flex("row", "flex-end")}
  margin: 0 24px 24px 16px;
`;

const FeaturedBox = styled.div`
  ${flex()}
  height: 15px;
`;

const CountBox = styled.div`
  padding: 2px 5px 2.5px 5px;
  background-color: ${featuredBoxBlue};
  color: #fff;
  font-size: 10px;
  line-height: 10px;
  border-radius: 3px;
  margin-right: 5px;
  margin-left: -2px;
  position: relative;
  top: 1px;
`;

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

function mapStateToProps(state) {
  let { interesting, featured, hot, week, month, tfeatured } = state.home;
  return {
    interesting,
    featured,
    hot,
    week,
    month,
    tfeatured
  };
}
export default connect(
  mapStateToProps,
  { update_home }
)(Home);
