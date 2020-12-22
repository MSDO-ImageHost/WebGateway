
import { Component } from 'react';

// Auth
import {withIsAuthenticated} from 'react-auth-kit';

// App components
import '../../App.css';
import { Emoji } from '../../ui_components/Icons';

// Server communication
import axios from 'axios';


// Bootstrap
import Button from 'react-bootstrap/Button';



// Renders the likes status of the post
class PostLikesElement extends Component {

    constructor(props) {
        super(props)
        this.state = {likes: 0, has_liked: false}
        this.fetchPostLikes = this.fetchPostLikes.bind(this)
        this.submitNewLike = this.submitNewLike.bind(this)
        this.fetchUserLike = this.fetchUserLike.bind(this)
        this.fetchPostLikes()
        if (this.props.isAuth) this.fetchUserLike()
    }

    fetchUserLike() {
        axios.get(`/api/likes/post/${this.props.data.post_id}/likes`).then(res => {
            if(res.status !== 200) return
            this.setState({ has_liked: res.data.like_status })
        })
    }

    fetchPostLikes() {
        axios.get(`/api/likes/${this.props.data.post_id}`).then(res => {
            if(res.status !== 200) return
            this.setState({ likes: res.data.like_amount })
        })
    }

    submitNewLike() {
        const payload = { post_id: this.props.data.post_id }
        axios.put(`/api/likes/`, payload).then(res => {
            if(res.status !== 200) return
            const new_like_amount = this.state.likes + (res.data.like_status ? 1 : -1)
            this.setState({ likes: new_like_amount ,has_liked: res.data.like_status })
        })
    }

    render () {
        const variant = this.state.has_liked ? 'success' : 'light';
        if (this.props.isAuth) {
            return <Button variant={variant} onClick={this.submitNewLike} style={{float: 'right'}}>{this.state.likes} <Emoji symbol="👍" label="sheep"/></Button>
        }
        return <Button variant={variant} style={{float: 'right'}}>{this.state.likes} <Emoji symbol="👍" label="sheep"/></Button>
    }
}

export default withIsAuthenticated(PostLikesElement)