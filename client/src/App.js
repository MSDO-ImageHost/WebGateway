import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Auth
import { AuthProvider } from 'react-auth-kit'
import { PrivateRoute } from 'react-auth-kit'

// Application pages
import { Frontpage } from "./pages/Frontpage";
import { Account } from "./pages/Account";
import { NewPostPage, PostPage } from "./pages/Posts";
import { Users } from "./pages/Users";
import { ScriptsPage } from "./pages/Scripts";
import { Login, Signup } from "./pages/Authenticate";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return <AuthProvider authStorageType = {'cookie'}
      authStorageName={'_auth_t'}
      authTimeStorageName={'_auth_time'}
      stateStorageName={'_auth_state'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}>

      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
          <Link to ="/"><Button>Posts</Button></Link>
            <Navbar.Collapse className="justify-content-end">
            <Link to="/createpost"><Button>New post</Button></Link>
            <Link to="/scripts"><Button>Automations</Button></Link>
            <Link to="/users"><Button>Users</Button></Link>
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/account"><Button>Account</Button></Link>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            {/* Public routes */}
            <Route exact path='/' component={Frontpage}/>
            <Route path='/post' component={PostPage}/>
            <Route path='/users' component={Users}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>

            {/* Controlled routes */}
            <PrivateRoute path='/account' component={Account} loginPath={'/login'} exact/>
            <PrivateRoute path='/createpost' component={NewPostPage} loginPath={'/login'}/>
            <PrivateRoute path='/scripts' component={ScriptsPage} loginPath={'/login'}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  }
}

export default App;

