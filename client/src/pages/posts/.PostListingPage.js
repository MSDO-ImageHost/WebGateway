import { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import '../../App.css';

// Server communication
import axios from 'axios';
import { Get } from 'react-axios';
import { HttpStatusMessage } from '../../ui_components/HttpStatusMessage';

// Bootstrap
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


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
        return <Card border="primary" style={{ width: '100%', marginTop: '10px'}}>
            <Card.Body>
                <Card.Title>{post.header.data}</Card.Title>
                <Card.Subtitle>{post.header.author_id}</Card.Subtitle>
                <PostImageView data={post}/>
                {/* <Card.Img variant="top" src={post.image_url} /> */}
                <Card.Text>{post.body.data}</Card.Text>
                <Link to={{pathname: `/posts/${post.post_id}`, state: post}}><Button variant="primary">Open post</Button></Link>
                <Card.Footer>{post.tags}</Card.Footer>
            </Card.Body>
        </Card>
    }
}


class PostLikesElement extends Component {

    constructor(props) {
        super(props)
        this.state = {likes: -1, has_liked: false}
        this.fetchLikesData = this.fetchLikesData.bind(this)
        this.fetchLikesData()
    }
    fetchLikesData() {
        const post = this.props.data
        axios.get(`/api/likes/${post.post_id}`).then(res => {
            if(res.status !== 200) return this.setState({image_data:'/images/thisisfine.gif'})
            this.setState({ likes: res.data.likes })
        })
    }
    render () {
        return <p>{this.state.image_data}</p>
    }
}
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
    render () {
        return <Card.Img variant="top" src={this.state.image_data}/>
    }
}



export {
    PostListingPage,
    PostListingEntry
}