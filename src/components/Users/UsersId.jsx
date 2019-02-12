import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import axios from "axios";
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1
} from "../../utilites/index.js";

export default class UsersId extends Component {
  state = {
    userId: this.props.match.params.id,
    loading: false
  };

  componentDidMount = () => {
    this.getUserData();
    // call for data useing props.match.params.id as the query
  };
  async getUserData() {
    let res = await axios.get(`/api/user/${this.state.userId}`);
    console.log(res.data);
  }

  render() {
    return (
      <LoadingWraper loading={this.state.loading}>
        <Layout>
          <Page style={{ border: "1px red solid" }}>
            <Content style={{ border: "1px red solid" }}>
              <H1>User Page {this.state.userId}</H1>
            </Content>
            {/* <Adds style={{ border: "1px red solid" }} /> */}
          </Page>
        </Layout>
      </LoadingWraper>
    );
  }
}
