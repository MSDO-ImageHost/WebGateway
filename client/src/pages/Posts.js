import { Component } from 'react';
import { Link } from 'react-router-dom';

// Application components
import '../App.css';
import { CommentRow, NewCommentForm } from './Comments';

// Server communication
import { Get } from 'react-axios'

// Bootstrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";



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

    postNewPostForm(event) {
        event.preventDefault();

        const formData = {
            header: event.target.newPostTitle.value,
            body: event.target.newPostContent.value,
            image_data: null,
            tags: []
        }

        fetch('/api/post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(data => console.log(data))
    }

    render() {
        return <Container fluid="md">
            <h1>Create new post</h1>
            <Form onSubmit={this.postNewPostForm}>
                {/* Title */}
                <Form.Group as={Row} controlId="newPostTitle">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="Title of the post" /></Col>
                </Form.Group>

                {/* Content */}
                <Form.Group as={Row} controlId="newPostContent">
                    <Form.Label column sm={2}>Content</Form.Label>
                    <Col sm={10}><Form.Control as="textarea"  placeholder="Post content" /></Col>
                </Form.Group>

                {/* Image upload */}
                <Form.Group as={Row} controlId="newPostImage">
                    <Form.Label column sm={2}>Image</Form.Label>
                    <Col sm={10}><Form.File label="Custom file input" custom/></Col>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Create</Button>
            </Form>
        </Container>
    }
}


class PostPage extends Component {

    render() {
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

            <Get url={`/api/post/${post.post_id}/comments`}>
            {(error, response, isLoading, makeRequest) => {
                if(error) {
                    return (<div>
                        <Alert variant='danger'>{error.message}</Alert>
                        <Button onClick={() => makeRequest({ params: { reload: true } })}>Retry</Button>
                    </div>)
                }
                else if(isLoading) {
                    return (<div className="spinner-center">
                        <Spinner animation="grow" variant="primary" />
                    </div>)
                }
                else if(response !== null) {
                    return (response.data.map(comment => <CommentRow key={comment.comment_id} data={comment}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get>

            <NewCommentForm post_id={post.post_id}/>
        </Container>
    }
}


export { PostPage, PostListingEntry, NewPostPage }