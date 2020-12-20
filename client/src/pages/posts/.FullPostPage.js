import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

// Application components
import '../../App.css';
import { CommentRow, NewCommentForm } from '../comments/Comments';
import { HttpStatusMessage } from '../../ui_components/HttpStatusMessage';

// Server communication
import { Get } from 'react-axios';
import axios from 'axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";

class FullPostPage extends Component {
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

            <div style={{marginTop: '10px'}}>
                <AuthorizeNewCommentForm post={post}/>
            </div>

            <Get url={`/api/posts/${post.post_id}/comments`}>
            {(error, response, isLoading, makeRequest) => {
                if(error || isLoading) return HttpStatusMessage.intermediateStatusRendering(error, isLoading)

                else if(response !== null) {
                    return (response.data.map(comment => <CommentRow key={comment.comment_id} data={comment}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get>
        </Container>
    }
}

const AuthorizeNewCommentForm = (post) => {
    return !useIsAuthenticated()() ?  null : (<NewCommentForm data={post}/>)
}


export {
    FullPostPage,
}