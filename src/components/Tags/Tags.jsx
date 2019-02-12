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
      searching: "",
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
                <SearchBox placeholder="Filter by tag name" />
                <ButtonContainer>
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
                </ButtonContainer>
              </SortBar>
              <Grid>
                {(this.props[this.state.view] || []).map(tag => {
                  return (
                    <MapReturn>
                      <Top>
                        <TinyTag subject={`${tag.name}`} />
                        <QuestionsApartOf>x {tag.total}</QuestionsApartOf>
                      </Top>
                      <TagDescription>{tag.description}</TagDescription>
                      <Asked>
                        <span>{tag.day}</span>
                        <span>{tag.week} </span>
                      </Asked>
                    </MapReturn>
                  );
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
  border-color: #bbc0c4;
  border: 1px solid lightgray;
  background-color: #fff;
  box-shadow: none;
  color: #3b4045;
  padding: 8px 9px 8px 9px;
  margin-left: 0;
  max-width: 180px;
`;
const ButtonContainer = styled.div``;
const CountBox = styled.div``;
const FeaturedBox = styled.div``;
const TagDescription = styled(P)`
  box-sizing: content-box;
  font-size: 12px;
  height: 39px;
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
