import { Component } from 'react';

// Application components
import { SignOutButton } from '../authentication/Authentication';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";


class Account extends Component{

    render() {
        console.log(this.props)

        return <Container>
            <h1>Hello from Account</h1>
            <SignOutButton/>
        </Container>
    }
}


export { Account }