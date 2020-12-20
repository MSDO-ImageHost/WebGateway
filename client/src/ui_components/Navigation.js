
import { Link } from 'react-router-dom';

// Auth
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


const NavigationBar = () => {
    const auth = useAuthUser()
    const navBarMenu = useIsAuthenticated()() ?  AuthenticatedMenu() : PublicMenu()

    return <Navbar bg="dark" variant="dark">
        <Link to ="/"><Button>Posts</Button></Link>
        <Navbar.Collapse className="justify-content-end">
            {navBarMenu}
        </Navbar.Collapse>
    </Navbar>
};

const PublicMenu = () => {
    return <div>
        <Link to="/login"><Button>Login</Button></Link>
    </div>
}

const AuthenticatedMenu = () => {
    return <div>
        <Link to="/createpost"><Button>New post</Button></Link>
        <Link to="/scripts"><Button>Automations</Button></Link>
        <Link to="/users"><Button>Users</Button></Link>
        <Link to="/account"><Button>Account</Button></Link>
    </div>
}


export { NavigationBar }