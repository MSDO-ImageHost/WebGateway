import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Bootstrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import bsCustomFileInput from 'bs-custom-file-input'



// Test data
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

class NewPostPage extends Component {
    render() {
        return <Container fluid="md">
            <h1>Create new post</h1>
            <Form >
                {/* Username */}
                <Form.Group as={Row} controlId="newPostTitle">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="Title of the post" /></Col>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Row} controlId="newPostContent">
                    <Form.Label column sm={2}>Content</Form.Label>
                    <Col sm={10}><Form.Control as="textarea"  placeholder="Post content" /></Col>
                </Form.Group>

                {/* Image upload */}
                <Form.Group as={Row} controlId="newPostImage">
                    <Form.Label column sm={2}>Image</Form.Label>
                    <Col sm={10}><Form.File id="custom-file"label="Custom file input"custom /></Col>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Create</Button>
            </Form>
        </Container>
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
    PostListingEntry,
    NewPostPage
}