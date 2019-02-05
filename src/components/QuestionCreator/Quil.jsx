import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import styled from 'styled-components'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
class Quill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'grab em by the horns',
            content: '',

            modules: {
                toolbar: [
                    // [{ 'header': [1, 2, false] }],

                    ['bold', 'italic', 'blockquote',],
                    ['link', 'image'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'header': [1, 2] }, {}],
                    // ['clean']
                ],
            },

            formats: [
                'header',
                'bold', 'italic', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
            ],

        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount = () => {
        this.setState({ text: this.props.text })
    }
    handleChange(value) {
        this.setState({ text: value })
        this.props.dataStore(this.state.text)
    }

    render() {
        if (this.props.reset) { this.setState({ text: '' }) }
        return (<>

            <ReactQuillStyled theme={'snow'}

                value={this.state.text}
                onChange={this.handleChange}
                modules={this.state.modules}
                formats={this.state.formats}

            />
        </>
        )

    }
}
export default Quill

const ReactQuillStyled = styled(ReactQuill)`
width: 100%;
`