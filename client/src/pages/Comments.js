import { Component } from 'react';
import { Link } from 'react-router-dom';

// Server communication
import { Post } from 'react-axios'

// Bootstrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../App.css';


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


    renderResponse(error, response, isLoading) {
        if(error) {
          return (<div>Something bad happened: {error.message}</div>)
        } else if(isLoading) {
          return (<div className="loader"></div>)
        } else if(response !== null) {
          return (<div>{response.data.message}</div>)
        }
        return null
    }

    postCommentContent(event) {
        event.preventDefault();
        const content = event.target.submitPostComment.value
    }

    render () {
        return <Form onSubmit={this.postCommentContent}>
            <Form.Group as={Row} controlId="submitPostComment">
                <Form.Label column sm={2}>Nickname</Form.Label>
                <Col sm={10}><Form.Control as="textarea" placeholder="Publish your opinion" required/></Col>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>

        // <Post url="/api/comment" data={{ content: 'A comment from Axios!' }}>
        //     {this.renderResponse}
        //     {/* <CommentRow key={comment.comment_id} data={comment}/> */}
        // </Post>
    }
}

export { CommentRow, NewCommentForm }