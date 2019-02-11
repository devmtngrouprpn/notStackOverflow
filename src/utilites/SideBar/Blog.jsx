import React from "react";
import styled from "styled-components";
import { TinyTag, Logo } from "./../index";
function Blog(props) {
  return (
    <>
      <BlogBox>
        <BlogTitle>BLOG</BlogTitle>
        <Line />
        <BlogSpacer>
          <MultiBlogBox>
            <ExchangeLogo
              src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4"
              alt="logo"
            />
            <BlogExchange>
              How the 2019 Stack Overflow Developer Survey Came to Be (And Your
              Last Chance…
            </BlogExchange>
          </MultiBlogBox>
        </BlogSpacer>
        <BlogTitle>FEATURED ON NOT META</BlogTitle>
        <Line />
        <BlogSpacer>
          <MultiBlogBox>
            <ExchangeLogo
              src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a"
              alt=""
            />
            <BlogExchange>Take the 2019 Developer Survey</BlogExchange>
          </MultiBlogBox>
        </BlogSpacer>
        <BlogTitle>HOT NOT META POSTS</BlogTitle>
        <Line />
        <BlogSpacer>
          <MultiBlogBox>
            <PostNum>17</PostNum>
            <BlogExchange>
              When logged in, pages from tags that are now synonyms do not
              render
            </BlogExchange>
          </MultiBlogBox>
          <MultiBlogBox>
            <PostNum>14</PostNum>
            <BlogExchange>
              Please don't auto-subscibe me to job alerts
            </BlogExchange>
          </MultiBlogBox>
        </BlogSpacer>
      </BlogBox>
    </>
  );
}
// BLOG START
const BlogBox = styled.div`
  padding: 15px 15px 10px;
  background-color: #fff8dc;
  border: 1px solid #e0dcbf;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(59, 64, 69, 0.1);
  margin-bottom: 16px;
`;
const BlogTitle = styled.h1`
  font-weight: bold;
  font-size: 11px;
  color: #9c988b;
  text-transform: uppercase;
  margin-top: 15px;
`;
const BlogSpacer = styled.div`
  padding: 0 5px;
  margin-bottom: 8px;
  /* display: flex; */
`;
const BlogExchange = styled.div`
  font-size: 13px;
  font-weight: normal;
  color: #005999;
`;
const ExchangeLogo = styled(Logo)`
  max-width: 25px;
  height: 25px;
  padding-right: 5;
  margin-right: 5%;
`;
const MultiBlogBox = styled.div`
  padding: 0 5px;
  margin-bottom: 8px;
  display: flex;
`;
const PostNum = styled.h1`
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  color: #848d95;
  margin-right: 5%;
`;
const Line = styled.div`
  margin: 5%;
  border: solid 0.5px #d6d9dc;
`;
// BLOG END
export default Blog;
