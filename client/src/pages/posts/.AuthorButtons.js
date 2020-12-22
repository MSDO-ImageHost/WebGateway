import { Component } from 'react';
import { Link } from 'react-router-dom';

// Application components
import '../../App.css';

// Server communication
import axios from 'axios';

// Bootstrap
import Button from 'react-bootstrap/Button';


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
        return <Button onClick={this.deletePost} variant="danger">🗑️</Button>
    }
}


export default AuthorButtons

