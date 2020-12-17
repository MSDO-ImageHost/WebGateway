import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Application pages
import Frontpage from "./pages/Frontpage";
import Account from "./pages/Account";
import { NewPostPage, PostPage } from "./pages/Posts";
import Users from "./pages/Users";
import { ScriptsPage } from "./pages/Scripts";
import { Login, Signup } from "./pages/Authenticate";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return <Router>
      <div>
        <Navbar bg="dark" variant="dark">
        <Link to ="/"><Button>Posts</Button></Link>
          <Navbar.Collapse className="justify-content-end">
          <Link to="/createpost"><Button>New post</Button></Link>
          <Link to="/login"><Button>Login</Button></Link>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Frontpage}/>
          <Route path='/post' component={PostPage}/>
          <Route path='/createpost' component={NewPostPage}/>
          <Route path='/account' component={Account}/>
          <Route path='/users' component={Users}/>
          <Route path='/scripts' component={ScriptsPage}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
      </div>
    </Router>
  }
}

export default App;

