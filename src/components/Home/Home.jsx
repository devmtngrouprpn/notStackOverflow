import React from 'react';
import Layout from '../Layout/Layout1.jsx';
import HQCard from './../Questions/HQCard'

export default function Home(props) {
    return (
        <>
            <Layout>
                <h1>Home Page</h1>
                <HQCard />
            </Layout>
        </>
    )
};
