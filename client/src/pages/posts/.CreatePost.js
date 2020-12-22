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
import Image from 'react-bootstrap/Image';

import FileBase64 from 'react-file-base64';



class NewPostPage extends Component {

    constructor(props) {
        super(props)
        this.state = {image_file: {}}
        this.postNewPostForm = this.postNewPostForm.bind(this);
    }

    getImageFile(f){
        this.setState({image_file:f})
    }

    postNewPostForm(event) {
        event.preventDefault();
        const formData = {
            header: event.target.titleField.value,
            body: event.target.contentField.value,
            image_data: this.state.image_file,
            tags: event.target.tagsField.value,
        }

        // Post post data :)
        axios.post('/api/posts', formData).then((res) => {
            if(res.status !== 201) return alert("Oh noooo. \n status:", res.status)
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
                <FormFieldGroup form={{id:"contentField", title:"What is this about?", type:"textarea", ph:"What is this about?"}}/>
                <FormFieldGroup form={{id:"tagsField", title:"Tag it!", type:"text", ph:"#LetUsPassPlz"}}/>

                {/* Image upload */}
                <Form.Group as={Row} controlId="newPostImage">
                    <Form.Label column sm={2}>Image</Form.Label>
                    {/* <Col sm={10}><Form.File label="Custom file input" custom/></Col> */}
                    <Col sm={10}><FileBase64 multiple={ true } onDone={ this.getImageFile.bind(this) } required/></Col>
                </Form.Group>
                {<Image src={this.state.image_file.base64} fluid />}

                <Button variant="primary" type="submit" style={{float: 'right'}}>Create</Button>
            </Form>
        </Container>
    }
}

export default NewPostPage
