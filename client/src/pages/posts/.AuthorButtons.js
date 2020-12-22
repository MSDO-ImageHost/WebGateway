import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { useAuthUser, withIsAuthenticated } from 'react-auth-kit';

// Application components
import '../../App.css';
import { CommentRow, NewCommentForm } from '../comments/Comments';
import { HttpStatusMessage } from '../../ui_components/HttpStatusMessage';
import PostLikesElement from './.PostLikesElement';
import PostImageElement from './.PostImageElement';
import PostUserElement from './.PostUserElement';
import PostTagsElement from './.PostTagsElement';

// Server communication
import { Get } from 'react-axios';
import axios from 'axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

class AuthorButtons extends Component {

    constructor(props) {
        super(props)
        this.deletePost = this.deletePost.bind(this)
    }

    deletePost () {
        axios.delete(`/api/posts/${this.props.data.post_id}`, {}).then(res => {
            if(res.status !== 200) return alert("Oh noooo. An error occurred")
            //this.location.history.push("/")
            window.location.replace("/");
        })
    }

    render() {
        return <Button onClick={this.deletePost} variant="danger">Delete</Button>
    }
}


export default AuthorButtons

