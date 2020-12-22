import { Component } from 'react';

// App components
import '../../App.css';

// Server communication
import axios from 'axios';


export default class PostTagsElement extends Component {
    constructor(props) {
        super(props)
        this.state = {tags: []}
        this.fetchTags = this.fetchTags.bind(this)
        this.fetchTags()
    }
    fetchTags() {
        const post = this.props.data
        axios.get(`/api/posts/${post.post_id}/tags/`).then(res => {
            if(res.status !== 200) return
            this.setState({ tags: res.data.tags })
        })
    }
    render () {
        return <p>{this.state.tags}</p>
    }
}


