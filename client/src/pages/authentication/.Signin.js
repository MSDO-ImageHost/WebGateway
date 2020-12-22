import { Component } from 'react';
import { Link } from 'react-router-dom';

// Auth
import { withSignIn } from 'react-auth-kit';

// Server communication
import axios from 'axios';

// Application components
import { FormFieldGroup } from '../../ui_components/FormFields';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


class SigninView extends Component {

    constructor(props) {
        super(props);
        this.postLoginForm = this.postLoginForm.bind(this);
    }

    postLoginForm(event) {
        event.preventDefault();
        const formData = {
            username: event.target.usernameField.value,
            password: event.target.passwordField.value
        }

        // Post data
        axios.post('/api/login', formData)
            .then((res) => {
                if(res.status !== 200) return alert("Oh noooo. Something didn't go well")
                const hasAuth = this.props.signIn({
                    token: res.data.token,
                    tokenType: "Bearer",
                    expiresIn: 60,
                    authState: res.data.user
                })

                if (hasAuth) {
                    this.props.history.push("/");
                } else {
                    alert("Sorry, but I could not sign you in")
                }
            })
            .catch((error) => {
                alert("Something went wrong. Did you type correctly?\nMaybe you need to sign up first?")
            });
    }

    render() {
        return <Container fluid="md">
            <h1>Enter credentials to login</h1>
            <Form onSubmit={this.postLoginForm}>
                <FormFieldGroup form={{id:"usernameField", title:"Nickname", type:"text", ph:"Enter nickname"}}/>
                <FormFieldGroup form={{id:"passwordField", title:"Password", type:"password", ph:"Password"}}/>
                <Form.Text className="text-muted">Not signed up yet? Don't worry, you can sign up <Link to="signup">here</Link></Form.Text>
                <Button variant="primary" type="submit" style={{float: 'right'}}>Sign in</Button>
            </Form>
        </Container>
    }
}

export default withSignIn(SigninView)