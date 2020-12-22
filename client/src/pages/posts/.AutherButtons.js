import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

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

    render() {
        return <Button>
            
        </Button>
    }
}


