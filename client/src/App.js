import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Auth
import { AuthProvider, PrivateRoute } from 'react-auth-kit';

// Application pages
import { ProfilePage } from "./pages/account/Account";
import { NewPostPage, FullPostPage, PostListingPage } from "./pages/posts/Posts";
import { Users } from "./pages/users/Users";
import { ScriptsPage } from "./pages/automations/Scripts";
import { SignupView, SigninView } from "./pages/authentication/Authentication";
import { NavigationBar } from "./ui_components/Navigation";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <AuthProvider authStorageType = {'cookie'}
        authStorageName={'_auth_t'}
        authTimeStorageName={'_auth_time'}
        stateStorageName={'_auth_state'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}>

      <Router>
        <NavigationBar/>
        <Switch>
          <Route exact path='/' component={PostListingPage}/>
          <Route path='/posts' component={FullPostPage}/>
          <Route path='/users' component={Users}/>
          <Route path='/login' component={SigninView}/>
          <Route path='/signup' component={SignupView}/>
          <PrivateRoute exact path='/account' component={ProfilePage} loginPath={'/login'}/>
          <PrivateRoute exact path='/createpost' component={NewPostPage} loginPath={'/login'}/>
          <PrivateRoute exact path='/scripts' component={ScriptsPage} loginPath={'/login'}/>
          <PrivateRoute exact path='/logout' component={ScriptsPage} loginPath={'/login'}/>
        </Switch>
      </Router>
    </AuthProvider>
  }
}

export default App;