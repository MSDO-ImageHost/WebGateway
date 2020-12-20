import { Component } from 'react';

// Application components
import { SignOutButton } from '../authentication/Authentication';

// Auth
import {withAuthUser} from 'react-auth-kit'

// Bootstrap
import Container from "react-bootstrap/esm/Container";


class ProfilePage extends Component{

    render() {
        console.log()
        return <Container>
            <h1>Hi {this.props.authState.username}!</h1>
            <h3>This will soon be your profile page</h3>
            <SignOutButton/>
        </Container>
    }
}

export default withAuthUser(ProfilePage)