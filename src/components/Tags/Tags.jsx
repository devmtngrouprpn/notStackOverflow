import React, { Component } from "react";
import Layout from "../Layout/Layout1.jsx";
import styled from "styled-components";
import { TinyTag } from "../../utilites/index.js";
import { P } from "../../utilites/index";
import axios from "axios";

export default class Tags extends Component {
  constructor() {
    super();
    this.state = {
      data: { allTags: [], day: [], week: [] }
    };
  }
  componentDidMount = async () => {
    let res = await axios.get("/api/tags/alltinytags");
    this.setState({ data: res.data });
    console.log(this.state);
  };
  render() {
    return (
      <>
        <Layout>
          <Content>
            <Title>Tags</Title>
            <Desc>
              A tag is a keyword or label that categorizes your question with
              other, similar questions. Using the right tags makes it easier for
              others to find and answer your question.
            </Desc>
            <Grid>
              {this.state.data.allTags.map(e => {
                return (
                  <MapReturn>
                    <Top>
                      <TinyTag subject={`${e.name}`} />
                      <QuestionsApartOf>
                        x {e.questions_with_tag}
                      </QuestionsApartOf>
                    </Top>
                    <TagDescription>{e.description}</TagDescription>
                    <Asked>
                      <span>
                        {this.state.data.day.map(f => {
                          if (f.name === e.name) {
                            return f.question_tag + " asked today, ";
                          }
                        })}
                      </span>
                      <span>
                        {this.state.data.week.map(c => {
                          if (c.name === e.name) {
                            return c.question_tag + " asked this week";
                          }
                        })}{" "}
                      </span>
                    </Asked>
                  </MapReturn>
                );
              })}
            </Grid>
          </Content>
        </Layout>
      </>
    );
  }
}
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
