import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/public';

import Main from './components/pages/Main';

const mapPrivateRoutes = () => (
  PrivateRoutes.map((route, key) => (
    <PrivateRoute exact key={key} path={route.path} component={route.component} />
  ))
);

const mapPublicRoutes = () => (
  PublicRoutes.map((route, key) => (
    <Route exact key={key} path={route.path} component={route.component} />
  ))
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    }
  />
);

class App extends Component {
  state = {
    isLoggedIn: false,
    
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState()
    })
  }

  render() {
    return (
      <div id='app'>
        <Switch>
          {/* { mapPublicRoutes() } */}
          {/* { mapPrivateRoutes() } */}
          <Route exact path='/' component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
