import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

// Auth
import { withSignIn } from 'react-auth-kit'

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Login extends Component{

    postLoginForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target), formDataObj = Object.fromEntries(formData.entries())

        const jsonRes = fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formDataObj)
        }).then(res => res.json())

        jsonRes.then(res => {
            console.log(res)
            if (this.props.signIn({token: res.data.token,
                expiresIn:res.data.expiresIn,
                tokenType: "Bearer",
                authState: res.data.authUserState})){
                // Redirect or do-something
            } else {
                //Throw error
            }
        })
    }

    render() {
        return <Container fluid="md">
            <h1>Enter credentials to login</h1>
            <Form onSubmit={this.postLoginForm}>
                {/* Username */}
                <Form.Group as={Row} controlId="signinFormUsername">
                    <Form.Label column sm={2}>Nickname</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="Enter nickname" /></Col>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Row} controlId="signinFormEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}><Form.Control type="email" placeholder="Email" /></Col>
                </Form.Group>

                {/* Password */}
                <Form.Group as={Row} controlId="signinFormPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="Password" /></Col>
                </Form.Group>
                <Form.Text className="text-muted">Not signed up yet? Don't worry, you can sign up <Link to="signup">here</Link></Form.Text>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Sign in</Button>
            </Form>
        </Container>
    }
}

class Signup extends Component {

    postSignupForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target), formDataObj = Object.fromEntries(formData.entries())

        if (formDataObj.password !== formDataObj.password_confirmation) {
            return alert("Passwords do not match")
        }

        fetch('/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formDataObj)
        }).then(res => res.json()).then(data => console.log(data))

        return <Redirect to={'/'} />
    }

    render() {
        return <Container fluid="md">
            <h1>Please give us your details</h1>
            <Form onSubmit={this.postSignupForm}>
                {/* Username */}
                <Form.Group as={Row} controlId="signupFormUsername">
                    <Form.Label column sm={2}>Nickname</Form.Label>
                    <Col sm={10}><Form.Control name="username" type="text" placeholder="Enter nickname" required/></Col>
                </Form.Group>

                {/* Email */}
                <Form.Group as={Row} controlId="signupFormEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}><Form.Control name="email" type="email" placeholder="Email" required/></Col>
                </Form.Group>

                {/* Passwords */}
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Password</Form.Label>
                        <Col>
                            <Form.Group controlId="signupFormPassword">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="signupFormPasswordConfirm">
                                <Form.Control
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Type password again"
                                    message="test"
                                    required
                                />
                            </Form.Group>
                        </Col>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Sign up</Button>
            </Form>
        </Container>
    }
}






export { Login, Signup }