import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import { PostListingEntry } from './Posts';


// Server communication
import { TEST_POSTS } from '../api/mocking_data';

// Bootstrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/esm/Container";


class Frontpage extends Component{

    render() {
        const postListings = TEST_POSTS.map(post => {
            return <PostListingEntry key={post.post_id} data={post}/>
        })

        return <Container>
            {postListings}
        </Container>
    }
}

export default Frontpage;