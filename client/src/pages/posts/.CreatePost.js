import { Component } from 'react';

// Application components
import '../../App.css';
import { FormFieldGroup } from '../../ui_components/FormFields';

// Server communication
import axios from 'axios';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FileBase64 from 'react-file-base64';



class NewPostPage extends Component {

    constructor(props) {
        super(props)
        this.postNewPostForm = this.postNewPostForm.bind(this)
    }

    postNewPostForm(event) {
        event.preventDefault();
        const formData = {
            header: event.target.titleField.value,
            body: event.target.contentField.value,
            image_data: event.target.newPostImage.value,
            tags: []
        }

        // Post post data :)
        axios.post('/api/posts', formData).then((res) => {
            if(res.status !== 201) return alert("Oh noooo. \n status:", res.status)
            console.log(res)
            this.props.history.push({
                pathname: `/posts/${res.data.post_id}`,
                state: res.data
            });
        })
    }

    render() {
        return <Container fluid="md">
            <h1>Create new post</h1>
            <Form onSubmit={this.postNewPostForm}>
                <FormFieldGroup form={{id:"titleField", title:"Title of your post", type:"text", ph:"Title goes here"}}/>
                <FormFieldGroup form={{id:"contentField", title:"Title of your post", type:"textarea", ph:"What is this about?"}}/>

                {/* Image upload */}
                <Form.Group as={Row} controlId="newPostImage">
                    <Form.Label column sm={2}>Image</Form.Label>
                    <Col sm={10}><Form.File label="Custom file input" custom/></Col>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Create</Button>
            </Form>
        </Container>
    }
}

export default NewPostPage