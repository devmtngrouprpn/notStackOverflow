import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import { LoadingWraper } from "./../../utilites/index";
import axios from "axios";

export default class Home extends Component {
  state = {
    interesting: {},
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
  }
  render() {
    console.log(this.state.interesting);
    return (
      <Layout>
        <LoadingWraper text loading={this.state.loading}>
          <h1>Home Page</h1>
          {/* <p>{this.state.interesting[0].question_id}</p> */}
        </LoadingWraper>
      </Layout>
    );
  }
}
