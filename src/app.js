import React, {Component} from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

import Auth from 'j-toker';

import * as api from './api.js';




export default class App extends Component {
  constructor(props) {
    super(props);
    Auth.configure({apiUrl: api.url});
    
    this.state = {
      history: createBrowserHistory(),
      auth: {
        headers: Auth.retrieveData('authHeaders')
      }
    }
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate(){
    this.setState({
      auth: {
        headers: Auth.retrieveData('authHeaders')
      }
    })
  }

  render() {
    console.log(this.state.auth)
    return(
      <HashRouter>
        <Switch>
          <Route exact path="/register" history={this.state.history} name="Register Page"  render={(props) => <Register {...props} authenticate={this.authenticate} auth={this.state.auth}/>}/>
          <Route exact path="/404"      history={this.state.history} name="Page 404"       render={(props) => <Page404 {...props}  authenticate={this.authenticate} auth={this.state.auth}/>} />
          <Route exact path="/500"      history={this.state.history} name="Page 500"       render={(props) => <Page500 {...props}  authenticate={this.authenticate} auth={this.state.auth}/>} />
          <Route exact path="/login"    history={this.state.history} name="Login Page"     render={(props) => <Login {...props}    authenticate={this.authenticate} auth={this.state.auth}/>} />
          <Route path="/"               history={this.state.history} name="Home"           render={(props) => <Full {...props}     authenticate={this.authenticate} auth={this.state.auth}/>} />
        </Switch>
      </HashRouter>
    )
  }
}