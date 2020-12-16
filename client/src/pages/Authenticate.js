import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Login extends Component{
    render() {
        return <Container fluid="md">
            <h1>Enter credentials to login</h1>
            <Form>
                {/* Username */}
                <Form.Group as={Row} controlId="formBasicUsername">
                    <Form.Label column sm={2}>Nickname</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="Enter nickname" /></Col>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}><Form.Control type="email" placeholder="Email" /></Col>
                </Form.Group>

                {/* Password */}
                <Form.Group as={Row} controlId="formBasicPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="Password" /></Col>
                </Form.Group>
                <Form.Text className="text-muted">No account yet? <Link to="signup">Create one here</Link></Form.Text>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Login</Button>
            </Form>
        </Container>
    }
}



class Signup extends Component{

    onSubmit(e) {
        e.preventDefault();
        console.log(this.props.formAction)
    }

    render() {
        return <Container fluid="md">
            <h1>Please give us your details</h1>
            <Form>
                {/* Username */}
                <Form.Group as={Row} controlId="formBasicUsername">
                    <Form.Label column sm={2}>Nickname</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="Enter nickname" /></Col>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}><Form.Control type="email" placeholder="Email" /></Col>
                </Form.Group>

                {/* Passwords */}
                <Form.Group as={Row} controlId="formBasicPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={5}><Form.Control type="password" placeholder="Password" /></Col>
                    <Col sm={5}><Form.Control type="password" placeholder="Type password again" /></Col>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Signup</Button>
            </Form>
        </Container>
    }
}


export { Login, Signup }