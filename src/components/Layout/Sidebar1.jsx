import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flex } from '../../utilites/index.js';


function Sidebar(props) {
    return (
        <>
            <Link to='/'>
                <h3>Home</h3>
            </Link>

            <h3>Public</h3>

            <Link to='/questions'>
                <h4>Globe notStackOverflow</h4>
            </Link>
            <Link to='/tags'>
                <h4>Tags</h4>
            </Link>
            <Link to='/users'>
                <h4>Users</h4>
            </Link>
        </>
    )
}

export default Sidebar;