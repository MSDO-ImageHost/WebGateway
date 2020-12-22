import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { withAuthUser, useIsAuthenticated } from 'react-auth-kit';

// Application components
import '../../App.css';
import CommentRow from '../comments/CommentRow';
import NewCommentForm  from '../comments/NewCommentForm';
import { HttpStatusMessage } from '../../ui_components/HttpStatusMessage';
import PostLikesElement from './.PostLikesElement';
import PostImageElement from './.PostImageElement';
import PostUserElement from './.PostUserElement';
import PostTagsElement from './.PostTagsElement';
import AuthorButtons from './.AuthorButtons';


// Server communication
import { Get } from 'react-axios';
import axios from 'axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

class FullPostPage extends Component {


    render() {
        const post = this.props.location.state
        const dateObj = new Date(post.created_at)
        const clock = dateObj.toLocaleTimeString()
        const date = dateObj.toDateString()

        const is_authenticated = this.props.authState != null | undefined
        const is_author = is_authenticated && this.props.authState.user_id === post.author_id

        const author_control = is_author ? <AuthorButtons data={post}/> : null
        const new_comment_form = is_authenticated ? <NewCommentForm data={post}/> : null

        return <Container>
            <Card border="primary" style={{ width: '100%', marginTop: '10px'}}>
                <PostImageElement data={post}/>
                <Card.Body>
                    <Card.Title>{post.header.data}</Card.Title>
                    <Card.Text>{post.body.data}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row>
                        <Col md={3}><PostUserElement data={post}/>{date} @ {clock}</Col>
                        <Col><PostTagsElement data={post}/></Col>
                        <Col md={{ span: 2 }}>{author_control}<PostLikesElement data={post}/></Col>
                    </Row>
                </Card.Footer>
            </Card>
            <div style={{marginTop: '10px'}}>{new_comment_form}</div>
            <Get url={`/api/posts/${post.post_id}/comments`}>
            {(error, response, isLoading, makeRequest) => {
                if(error || isLoading) return HttpStatusMessage.intermediateStatusRendering(error, isLoading, makeRequest)
                else if(response !== null) {
                    return (response.data.map(comment => <CommentRow key={comment.comment_id} data={comment}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get>
        </Container>
    }
}



export default withAuthUser(FullPostPage)
