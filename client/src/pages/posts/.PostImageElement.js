import { Component } from 'react';

// App components
import '../../App.css';


// Server communication
import axios from 'axios';

// Bootstrap

import Card from 'react-bootstrap/Card';




// Renders the image
export default class PostImageElement extends Component {

    constructor(props) {
        super(props)
        this.state = {image_data: "/images/thisisfine.gif"}
        this.fetchImageData = this.fetchImageData.bind(this)
        this.fetchImageData()
    }
    fetchImageData() {
        const post = this.props.data
        axios.get(`/api/images/${post.post_id}`).then(res => {
            if(res.status !== 200) return //this.setState({image_data:'/images/thisisfine.gif'})
            this.setState({image_data: res.data.image_data})
        })
    }
    render () { return <Card.Img variant="top" src={this.state.image_data} /> }
}


