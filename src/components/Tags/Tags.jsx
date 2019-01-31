import React from 'react';
import Layout from '../Layout/Layout1.jsx';
import styled from 'styled-components'
import { TinyTag } from '../../utilites/index.js'

export default function Tags(props) {
    return (
        <>
            <Layout>
                <Content>
                    <Title>Tags</Title>
                    <Flex>
                        <TinyTag subject='javascript' />
                        <TinyTag subject='javascript' />
                    </Flex>
                </Content>
            </Layout>
        </>
    )
};
const Content = styled.div`
padding: 24px;
`
const Title = styled.div`
font-size:25px;
`
const Flex = styled.div`
display:flex;
`