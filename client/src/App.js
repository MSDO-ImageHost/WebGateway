import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Frontpage from "./pages/Frontpage";
import Post from "./pages/Post";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Scripts from "./pages/Scripts";

class App extends Component {
  render() {
      // App consists of a NavBar on top and either
      // Frontpage
      // Post
      // Account
      // Accounts List
      // UserScripts
    return <Switch>
        <div>
            Navbar
        </div>
        <div>
            <Switch>
                <Route exact path='/' component={Frontpage}/>
                <Route path='/post' component={Post}/>
                <Route path='/account' component={Account}/>
                <Route path='/users' component={Users}/>
                <Route path='/scripts' component={Scripts}/>
            </Switch>
        </div>
    </Switch>;
  }
}

export default App;
