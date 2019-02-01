import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import {
  Page,
  Adds,
  Content,
  LoadingWraper,
  H1
} from "../../utilites/index.js";

export default class UsersId extends Component {
  state = {
    loading: false
  };

  componentDidMount = () => {
    // call for data useing props.match.params.id as the query
  };

  render() {
    return (
      <LoadingWraper loading={this.state.loading}>
        <Layout>
          <Page style={{ border: "1px red solid" }}>
            <Content style={{ border: "1px red solid" }}>
              <H1>User Page {this.props.match.params.id}</H1>
            </Content>
            <Adds style={{ border: "1px red solid" }} />
          </Page>
        </Layout>
      </LoadingWraper>
    );
  }
}
