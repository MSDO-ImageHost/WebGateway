import { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import '../../App.css';
import PostLikesElement from './.PostLikesElement';
import PostImageElement from './.PostImageElement';
import PostUserElement from './.PostUserElement';
import PostTagsElement from './.PostTagsElement';

// Server communication
import axios from 'axios';
import { Get } from 'react-axios';
import { HttpStatusMessage } from '../../ui_components/HttpStatusMessage';

// Bootstrap
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class PostListingPage extends Component {
    render() {
        return <Container>
            <Get url="/api/posts">
            {(error, response, isLoading, makeRequest) => {
                if(error || isLoading) return HttpStatusMessage.intermediateStatusRendering(error, isLoading, makeRequest)
                else if(response !== null) return (response.data.map(post => <PostListingEntry key={post.post_id} data={post}/>))
                return (<div>Default message before request is made.</div>)
            }}
            </Get>
        </Container>
    }
};


// Used on the frontpage for posts overview
class PostListingEntry extends Component {
    render() {
        const post = this.props.data
        const dateObj = new Date(post.created_at)
        const clock = dateObj.toLocaleTimeString()
        const date = dateObj.toDateString()

        return <Card border="primary" style={{ width: '100%', marginTop: '10px'}}>
            <PostImageElement data={post}/>
            <Card.Body>
                <Card.Title>{post.header.data}</Card.Title>
                <Card.Text>{post.body.data}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Row>
                    <Col md={3}><PostUserElement data={post}/>{date} @ {clock}</Col>
                    <Col md={1}></Col>
                    <Col md={4}><PostTagsElement data={post}/></Col>
                    <Col md={2}></Col>
                    <Col md={1}><PostLikesElement data={post}/></Col>
                    <Col md={1}><Link style={{float: 'right'}} to={{pathname: `/posts/${post.post_id}`, state: post}}><Button variant="primary">Read post</Button></Link></Col>
                </Row>
            </Card.Footer>
        </Card>
    }
}



export {
    PostListingPage,
    PostListingEntry
}