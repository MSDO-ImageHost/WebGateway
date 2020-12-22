import { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import '../../App.css';
import PostLikesElement from './.PostLikesElement';

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
                if(error || isLoading) return HttpStatusMessage.intermediateStatusRendering(error, isLoading)

                else if(response !== null) {
                    return (response.data.map(post => <PostListingEntry key={post.post_id} data={post}/>))
                }
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
            <Card.Img src="/images/thisisfine.gif" />
            <Card.Body>
                <Card.Title>{post.header.data}</Card.Title>
                {/* <PostImageView data={post}/> */}
                <Card.Text>{post.body.data}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Row>
                    <Col md={3}><PostUserElement data={post}/>{date} @ {clock}</Col>
                    <Col md={4}></Col>
                    <Col md={2}><PostLikesElement data={post}/></Col>
                    <Col md={2}><Link style={{float: 'right'}} to={{pathname: `/posts/${post.post_id}`, state: post}}><Button variant="primary">Read post</Button></Link></Col>
                </Row>
            </Card.Footer>
        </Card>
    }
}


class PostTagsElement extends Component {
    constructor(props) {
        super(props)
        this.state = {tags: []}
        this.fetchTags = this.fetchTags.bind(this)
        this.fetchTags()
    }
    fetchTags() {
        const post = this.props.data
        axios.get(`/api/posts/${post.post_id}/tags/`).then(res => {
            if(res.status !== 200) return
            this.setState({ tags: res.data.tags })
        })
    }
    render () {
        return <p>{this.state.tags}</p>
    }
}


// Renders the user name and link (to users account) button
class PostUserElement extends Component {

    constructor(props) {
        super(props)
        this.state = {username: this.props.data.author_id}
        this.fetcUserData = this.fetcUserData.bind(this)
        this.fetcUserData()
    }
    fetcUserData() {
        axios.get(`/api/users/${this.props.data.author_id}`).then(res => {
            if(res.status !== 200) return
            this.setState({ username: res.data.username })
        })
    }
    render () { return <div>Posted by <Link to={{pathname: `/accounts/${this.props.data.author_id}`}}>{this.state.username}</Link></div>}
}

// Renders the image
class PostImageView extends Component {

    constructor(props) {
        super(props)
        this.state = {image_data: {}}
        this.fetchImageData = this.fetchImageData.bind(this)
        this.fetchImageData()
    }
    fetchImageData() {
        const post = this.props.data
        axios.get(`/api/images/${post.post_id}`).then(res => {
            if(res.status !== 200) return this.setState({image_data:'/images/thisisfine.gif'})
            this.setState({image_data: `data:image/png;base64,${res.data.image_data}`})
        })
    }
    render () { return <Card.Img variant="top" src={this.state.image_data}/> }
}



export {
    PostListingPage,
    PostListingEntry
}