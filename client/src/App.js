import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Application pages
import Frontpage from "./pages/Frontpage";
import Post from "./pages/Post";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Scripts from "./pages/Scripts";
import { Login, Signup } from "./pages/Authenticate";

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return <Router>
      <div>
        <Navbar bg="dark" variant="dark">
        <Button href="/">Posts</Button>
          <Navbar.Collapse className="justify-content-end">
          <Button href="/login">Login</Button>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Frontpage}/>
          <Route path='/post' component={Post}/>
          <Route path='/account' component={Account}/>
          <Route path='/users' component={Users}/>
          <Route path='/scripts' component={Scripts}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
      </div>
    </Router>
  }
}

export default App;

