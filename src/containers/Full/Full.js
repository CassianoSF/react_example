import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Sidebar from '../../components/Sidebar/';
import Categorias from '../../views/Categorias/';
import Lançamentos from '../../views/Lançamentos/';

import Auth from 'j-toker'

class Full extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Sidebar {...this.props}/>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>

                <Route exact path="/categorias"  name="Categorias"  history={this.props.history} render={(props) => 
                  <Categorias {...props} authenticate={this.props.authenticate} auth={this.props.auth}/>}
                />
                <Route exact path="/lançamentos" name="Lançamentos" history={this.props.history} render={(props) => 
                  <Lançamentos {...props} authenticate={this.props.authenticate} auth={this.props.auth}/>}
                />

                <Redirect from="/" to={this.props.home}/>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Full;
