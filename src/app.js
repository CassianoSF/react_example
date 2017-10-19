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



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: createBrowserHistory()
    }
  }

  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path="/login"    name="Login Page"     component={Login}    history={this.state.history} />
          <Route exact path="/register" name="Register Page"  component={Register} history={this.state.history} />
          <Route exact path="/404"      name="Page 404"       component={Page404}  history={this.state.history} />
          <Route exact path="/500"      name="Page 500"       component={Page500}  history={this.state.history} />
          <Route path="/"               name="Home"           component={Full}     history={this.state.history} />
        </Switch>
      </HashRouter>
    )
  }
}