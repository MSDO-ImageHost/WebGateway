import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { withAuthUser } from 'react-auth-kit';

// App components
import '../../App.css';

// Server communication
import axios from 'axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CommentRow extends Component {

    constructor(props) {
        super(props)
        this.state = {username: this.props.data.author_id}
        this.fetcUserData = this.fetcUserData.bind(this)
        this.deleteComment =  this.deleteComment.bind(this)
        this.fetcUserData()
    }

    fetcUserData() {
        axios.get(`/api/users/${this.props.data.author_id}/name`).then(res => {
            if(res.status !== 200) return
            this.setState({ username: res.data.username})
        })
    }

    deleteComment() {
        console.log("deleting comment", this.props.data)
        axios.delete(`/api/comments/${this.props.data.comment_id}`, {}).then(res => {
            if(res.status !== 200) return alert("Oh noooo. An error occurred")
            //this.location.history.push("/")
            window.location.reload();
        })

    }

    render() {
        const comment = this.props.data
        const dateObj = new Date(comment.created_at)
        const clock = dateObj.toLocaleTimeString()
        const date = dateObj.toDateString()
        const author_control = this.props.authState && this.props.authState.user_id === comment.author_id.toString() ? <Button onClick={this.deleteComment} variant="danger">🗑️</Button> : null

        return <Card border="primary" style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
                <Card.Title>{comment.username}</Card.Title>
                <Row>
                    <Col><Card.Text>{comment.content}</Card.Text></Col>
                    <Col md={1}>{author_control}</Col>
                </Row>
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


export default withAuthUser(CommentRow)