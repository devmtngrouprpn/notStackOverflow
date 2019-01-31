import React from 'react';
import Layout from '../Layout/Layout1.jsx';
import styled from 'styled-components'
import { TinyTag } from '../../utilites/index.js'
import { P } from '../../utilites/index'
import axios from 'axios'

export default function Tags(props) {
    return (
        <>
            <Layout>
                <Content>
                    <Title>Tags</Title>
                    <Desc>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</Desc>
                    <Grid>
                        {<MapReturn>Oh its you</MapReturn>}
                    </Grid>
                </Content>
            </Layout>
        </>
    )
};
const Content = styled.div`
padding: 24px;
`
const Desc = styled(P)`
font-size:14px;
`
const MapReturn = styled.div`

`
const Title = styled(P)`
font-size:25px;
`
const Grid = styled.div`
position: relative;
  height: 100%;
  width:100%;
  display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;