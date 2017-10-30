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
    this.state = {
      history: createBrowserHistory(),
      auth: null
    }
    this.authenticate = this.authenticate.bind(this)
    this.login = this.login.bind(this)

    Auth.configure({apiUrl: api.url});
  }


  // Alterar o token a cada request (ainda não funcionando)
  authenticate(headers){
    // if (headers && headers['access-token']){
    //   // Auth
    //   //  .validateToken()
    //   //  .then(res => console.log(res))

    //   this.setState({
    //     auth: {
    //       headers: headers
    //     }
    //   })
    // }
  }
  
  login(){
    this.setState({
      auth: {
        headers: Auth.retrieveData('authHeaders')
      }
    })
  }

  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path="/register" history={this.state.history} name="Register Page" render={(props) => 
            <Register {...props} authenticate={this.authenticate} auth={this.state.auth}/>
          }/>
          <Route exact path="/404"      history={this.state.history} name="Page 404"      render={(props) => 
            <Page404 {...props}  authenticate={this.authenticate} auth={this.state.auth}/>
          }/>
          <Route exact path="/500"      history={this.state.history} name="Page 500"      render={(props) => 
            <Page500 {...props}  authenticate={this.authenticate} auth={this.state.auth}/>
          }/>
          <Route exact path="/login"    history={this.state.history} name="Login Page"    render={(props) => 
            <Login {...props}    login={this.login} />
          }/>
          <Route path="/"               history={this.state.history} name="Home"          render={(props) => 
            <Full {...props}     authenticate={this.authenticate} auth={this.state.auth} home={'/lançamentos'} />
          }/>
        </Switch>
      </HashRouter>
    )
  }
}