import { Component } from 'react';
import { Link } from 'react-router-dom';

// Application components
import '../../App.css';
import { CommentRow, NewCommentForm } from '../comments/Comments';

// Server communication
import { Get } from 'react-axios';
import { APIStatusRenderings } from '../../helpers/APIStatusRenderings';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";


class PostListingContainer extends Component {

    render() {
        const post = this.props.location.state
        return <Container>
            <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
                <Card.Body>
                    <Card.Title>{post.header.data}</Card.Title>
                    <Card.Subtitle>{post.header.author_id}</Card.Subtitle>
                    <Card.Img variant="top" src={post.image_url} />
                    <Card.Text>{post.body.data}</Card.Text>
                    <Link to={{pathname: `/posts/${post.post_id}`, state: post}}><Button variant="primary">Open post</Button></Link>
                    <Card.Footer>{post.tags}</Card.Footer>
                </Card.Body>
            </Card>

            <Get url={`/api/posts/${post.post_id}/comments`}>
            {(error, response, isLoading, makeRequest) => {
                if(error || isLoading) return APIStatusRenderings.intermediateStatusRendering(error, isLoading)

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



export {
    PostListingContainer,
    PostListingEntry
}