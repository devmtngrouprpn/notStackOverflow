import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../Layout/Layout1.jsx";
import styled from "styled-components";
import { TinyTag } from "../../utilites/index.js";
import { SearchBar } from "../../utilites/globals";
import { P, LoadingWraper, TabButton } from "./../../utilites/index";
import { setTags } from "../../ducks/tags.js";
import axios from "axios";

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      view: "popular",
      search: "",
      loading: true
    };
  }

  componentDidMount = async () => {
    if (!this.props.popular[0]) {
      const res = await axios.get("/api/tags/alltinytags");
      this.props.setTags(res.data);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  handleView = name => {
    this.setState({ view: name });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Layout>
          <LoadingWraper loading={this.state.loading}>
            <Content>
              <Title>Tags</Title>
              <Desc>
                A tag is a keyword or label that categorizes your question with
                other, similar questions. Using the right tags makes it easier
                for others to find and answer your question.
              </Desc>
              <SortBar>
                <SearchBox
                  name="search"
                  onChange={this.handleInput}
                  placeholder="Filter by tag name"
                  value={this.state.search}
                />
                <div>
                  <TabButton
                    onClick={() => this.handleView("popular")}
                    active={this.state.view === "popular"}
                    activeNeigbor={this.state.view === "name"}
                    position="left"
                  >
                    Popular
                  </TabButton>
                  <TabButton
                    onClick={() => this.handleView("name")}
                    active={this.state.view === "name"}
                    position="right"
                  >
                    Name
                  </TabButton>
                </div>
              </SortBar>
              <Grid>
                {(this.props[this.state.view] || []).map(tag => {
                  console.log(tag.tag_name);
                  if (tag.tag_name.includes(this.state.search)) {
                    return (
                      <MapReturn>
                        <Top>
                          <TinyTag subject={`${tag.tag_name}`} />
                          <QuestionsApartOf>x {tag.total}</QuestionsApartOf>
                        </Top>
                        <TagDescription>{tag.description}</TagDescription>
                        <Asked>
                          {tag.day !== "0" ? (
                            <span>
                              {tag.day} asked today, {tag.week} this week
                            </span>
                          ) : tag.week !== "0" ? (
                            <span>
                              {tag.week} asked this week, {tag.month} this month
                            </span>
                          ) : tag.month !== "0" ? (
                            <span>
                              {tag.month} asked this month, {tag.year} this year
                            </span>
                          ) : tag.year !== "0" ? (
                            <span>{tag.year} asked this year</span>
                          ) : (
                            <span />
                          )}
                        </Asked>
                      </MapReturn>
                    );
                  }
                })}
              </Grid>
            </Content>
          </LoadingWraper>
        </Layout>
      </>
    );
  }
}

function mapStateToProps(state) {
  let { popular, name } = state.tags;
  return {
    popular,
    name
  };
}

export default connect(
  mapStateToProps,
  { setTags }
)(Tags);

const SearchBox = styled(SearchBar)`
  border-radius: 3px;
  background-color: #fff;
  box-shadow: none;
  color: #3b4045;
  padding: 8px 9px 8px 9px;
  margin-left: 0;
  max-width: 180px;
`;

const TagDescription = styled(P)`
  box-sizing: content-box;
  font-size: 12px;
  height: 42px;
  line-height: 14px;
  overflow: hidden;
  margin-bottom: 4px;
  color: #848d95;
`;
const Asked = styled(P)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
`;
const SortBar = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;
const QuestionsApartOf = styled(P)`
  font-size: 11px;
  color: #6a737c;
  position: relative;
  top: 10px;
`;
const Top = styled(P)`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  justify-content: left;
`;
const Content = styled.div`
  padding: 24px;
`;
const Desc = styled(P)`
  font-size: 14px;
`;
const MapReturn = styled.div`
  /* grid-area: content; */
  border-bottom: 1px dotted #e4e6e8;
  overflow: visible;
`;
const Title = styled(P)`
  font-size: 25px;
  margin-bottom: 25px;
`;
const Grid = styled.div`
  grid-template-areas: "tag";
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
