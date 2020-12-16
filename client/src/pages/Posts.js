import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/esm/Container";


import { TEST_COMMENTS } from '../api/mocking_data';


// Used on the frontpage for posts overview
class PostListingEntry extends Component {
    render() {
        const post = this.props.data
        return <Card border="primary" style={{ width: '100%', marginTop: '10px'}}>
            <Card.Body>
                <Card.Title>{post.header.data}</Card.Title>
                <Card.Subtitle>{post.header.author_id}</Card.Subtitle>
                <Card.Img variant="top" src={post.image_url} />
                <Card.Text>{post.body.data}</Card.Text>
                <Link to={{pathname: `/post/${post.post_id}`, state: post}}><Button variant="primary">Open post</Button></Link>
                <Card.Footer>{post.tags}</Card.Footer>
            </Card.Body>
        </Card>
    }
}


class PostPage extends Component {
    render() {
        const comments = TEST_COMMENTS.map(comment => {
            return <CommentRow key={comment.comment_id} data={comment}/>
        })
        const post = this.props.location.state
        return <Container>
            <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
                <Card.Body>
                    <Card.Title>{post.header.data}</Card.Title>
                    <Card.Subtitle>{post.header.author_id}</Card.Subtitle>
                    <Card.Img variant="top" src={post.image_url} />
                    <Card.Text>{post.body.data}</Card.Text>
                    <Link to={{pathname: `/post/${post.post_id}`, state: post}}><Button variant="primary">Open post</Button></Link>
                    <Card.Footer>{post.tags}</Card.Footer>
                </Card.Body>
            </Card>
            {comments}
        </Container>
    }
}

class CommentRow extends Component {
    render() {
        const comment = this.props.data
        return <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
        </Card>
    }
}


export {
    PostPage,
    PostListingEntry
}