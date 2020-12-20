import { Component } from 'react';

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
    render() {
        const comment = this.props.data
        return <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
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
            this.props.history.push(`/posts/${post_id}`);
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