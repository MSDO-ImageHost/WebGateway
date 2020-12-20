import { Component } from 'react';
//import { Redirect, Link } from 'react-router-dom';

// Auth
import { withSignIn } from 'react-auth-kit';

// Server communication
import axios from 'axios';

// Application components
import { FormFieldGroup, PasswordConfirmFormFieldsGroup } from '../../ui_components/FormFields';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


class SignupView extends Component {

    constructor(props) {
        super(props);
        this.postSignupForm = this.postSignupForm.bind(this);
    }

    postSignupForm(event) {
        event.preventDefault();
        const formData = {
            username: event.target.usernameField.value,
            email: event.target.emailField.value,
            password: event.target.passwordField.value,
            password_confirm: event.target.confirmPasswordField.value
        }

        // Validate passwords
        if (formData.password !== formData.password_confirm) {
            return alert("Passwords do not match")
        }

        // Post data
        axios.post('/api/users', formData).then((res) => {
            if(res.status !== 201) return alert("Oh noooo. \n status:", res.status)

            const hasAuth = this.props.signIn({
                token: res.data.token,
                tokenType: "Bearer",
                expiresIn: 60,
                authState: res.data.user
            })

            if (hasAuth) {
                this.props.history.push("/account");
            } else {
                alert("Sorry, but an error occured while signing you up")
            }
        })
    }

    render() {
        return <Container fluid="md">
            <h1>Please give us your details</h1>
            <Form onSubmit={this.postSignupForm}>
                <FormFieldGroup form={{id:"usernameField", title:"Nickname", type:"text", ph:"Enter nickname"}}/>
                <FormFieldGroup form={{id:"emailField", title:"Email", type:"email", ph:"Enter email"}}/>
                <PasswordConfirmFormFieldsGroup form={{id:"emailField", title:"Email", type:"email", ph:"Enter email"}}/>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Sign up</Button>
            </Form>
        </Container>
    }
}

export default withSignIn(SignupView)