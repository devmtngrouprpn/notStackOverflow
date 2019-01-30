import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import { LoadingWraper } from "./../../utilites/index";
import axios from "axios";
import { connect } from "react-redux";
import {
  update_interesting,
  update_featured,
  update_hot,
  update_week,
  update_month
} from "./../../ducks/home";

class Home extends Component {
  state = {
    interesting: [],
    loading: ""
  };
  componentDidMount() {
    console.log("mounted");
    this.getQuestions();
  }
  async getQuestions() {
    this.setState({ loading: true });
    let res = await axios.get(`/api/questions/interesting`);
    console.log(res.data);
    await this.setState({ interesting: res.data.interesting });
    this.setState({ loading: false });
    this.props.update_interesting(res.data.interesting);
    this.props.update_featured(res.data.featured);
    this.props.update_hot(res.data.hot);
    this.props.update_week(res.data.week);
    this.props.update_month(res.data.month);
  }
  render() {
    console.log(this.state.interesting);
    let mappedQuestions = this.state.interesting.map(qInfo => {
      return (
        <>
          <>
            <p>{qInfo.votes}</p>
            <p>vote</p>
          </>
          <>
            <p>{qInfo.answers}</p>
            <p>answer</p>
          </>
          <>
            <p>{qInfo.question_views}</p>
            <p>views</p>
          </>
        </>
      );
    });
    return (
      <Layout>
        <LoadingWraper text loading={this.state.loading}>
          <h1>Home Page</h1>
          {mappedQuestions}
        </LoadingWraper>
      </Layout>
    );
  }
}
function mapPropsToState(state) {
  return { ...state };
}
export default connect(
  mapPropsToState,
  { update_interesting, update_featured, update_hot, update_week, update_month }
)(Home);

