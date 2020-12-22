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
        const author_control = this.props.authState && this.props.authState.user_id === post.author_id ? <AuthorButtons data={post}/> : null

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
            <Row>
                <Col></Col><div style={{marginTop: '10px'}}>
                    <AuthorizeNewCommentForm post={post}/>
                </div>
            </Row>
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

//  <AuthorButtons data={post}/>

const AuthorizeNewCommentForm = (post) => {
    return !useIsAuthenticated()() ?  null : (<NewCommentForm data={post}/>)
}

export default withAuthUser(FullPostPage)


// div style={{marginTop: '10px'}}><AuthorizeNewCommentForm post={post}/></div>