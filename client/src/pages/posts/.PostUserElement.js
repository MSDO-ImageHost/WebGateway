import { Component } from 'react';
import { Link } from 'react-router-dom';

// App components
import '../../App.css';

// Server communication
import axios from 'axios';




// Renders the user name and link (to users account) button
export default class PostUserElement extends Component {

    constructor(props) {
        super(props)
        this.state = {username: this.props.data.author_id}
        this.fetcUserData = this.fetcUserData.bind(this)
        this.fetcUserData()
    }
    fetcUserData() {
        axios.get(`/api/users/${this.props.data.author_id}`).then(res => {
            if(res.status !== 200) return
            this.setState({ username: res.data.username })
        })
    }
    render () { return <div>Posted by <Link to={{pathname: `/accounts/${this.props.data.author_id}`}}>{this.state.username}</Link></div>}
}
