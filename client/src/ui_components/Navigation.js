import { Link } from 'react-router-dom';

// Auth
import { useIsAuthenticated } from 'react-auth-kit';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


const NavigationBar = () => {
    const navBarMenu = useIsAuthenticated()() ?  AuthenticatedMenu() : PublicMenu()

    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">ImageHost</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            {navBarMenu}
        </Navbar.Collapse>
    </Navbar>
};

const PublicMenu = () => {
    return <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
}

const AuthenticatedMenu = () => {
    return <Nav>
            <Nav.Link href="/createpost">New post</Nav.Link>
            <Nav.Link href="/scripts">Automations</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
        </Nav>
}


export { NavigationBar }
