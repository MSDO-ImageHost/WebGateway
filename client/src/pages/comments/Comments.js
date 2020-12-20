import { Component } from 'react';

// App components
import '../../App.css';

// Server communication

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

    }
}

export { CommentRow, NewCommentForm }