import { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import '../../App.css';

// Server communication
import axios from 'axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CommentRow extends Component {

    constructor(props) {
        super(props)
        this.state = {username: this.props.data.author_id}
        this.fetcUserData = this.fetcUserData.bind(this)
        this.fetcUserData()
    }
    fetcUserData() {
        axios.get(`/api/users/${this.props.data.author_id}/name`).then(res => {
            if(res.status !== 200) return
            this.setState({ username: res.data.username })
        })
    }

    render() {
        const comment = this.props.data
        const dateObj = new Date(comment.created_at)
        const clock = dateObj.toLocaleTimeString()
        const date = dateObj.toDateString()
        return <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
                <Card.Title>{comment.username}</Card.Title>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Row>
                    <Col md={9}>Commented by: <Link to={{pathname: `/accounts/${this.props.data.author_id}`}}>{this.state.username}</Link></Col>
                    <Col>{date} @ {clock}</Col>
                </Row>
            </Card.Footer>
        </Card>
    }
}


class NewCommentForm extends Component {

    constructor(props) {
        super(props)
        this.postCommentContent = this.postCommentContent.bind(this)
    }

    postCommentContent(event) {
        event.preventDefault();
        const content = event.target.submitPostComment.value
        if (this.props.data.post.post_id === undefined) return
        const post_id = this.props.data.post.post_id

        // Post post data :)
        axios.post(`/api/posts/${post_id}/comments`, {content}).then((res) => {
            if(res.status !== 201) return alert("Oh noooo. \n status:", res.status)
            window.location.reload();
            //this.props.history.push(`/posts/${post_id}`); // TODO: should not redirect to
        })
    }

    render () {
        return <Form onSubmit={this.postCommentContent}>
            <Form.Group as={Row} controlId="submitPostComment">
                {/* <Form.Label column sm={2}>Comment</Form.Label> */}
                <Col><Form.Control as="textarea" placeholder="Publish your opinion" required/></Col>
                <Button variant="primary" type="submit">Submit</Button>
            </Form.Group>
        </Form>
    }
}

export { CommentRow, NewCommentForm }