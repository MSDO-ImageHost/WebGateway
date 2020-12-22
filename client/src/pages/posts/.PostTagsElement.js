import { Component } from 'react';
import { Link } from 'react-router-dom';

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
            this.setState({ tags: res.data })
        })
    }
    render () {
        const formatted = this.state.tags.map((tag, i) => { return <Link key={i} to={{pathname: `/tags/${tag.tag_id}`}}>#{tag.tag_name} </Link> })
        return <div className="text-muted" ><i>{formatted}</i></div>
    }
}