import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Lançamentos from '../../views/Lançamentos/';
import Categorias from '../../views/Categorias/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Components
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import Auth from 'j-toker'

class Full extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let home = this.props.auth ? "/dashboard" : "/login";
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <div className="app-body">
            <main className="main">
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                  <Route path="/components/cards" name="Cards" component={Cards}/>
                  <Route path="/components/forms" name="Forms" component={Forms}/>
                  <Route path="/components/modals" name="Modals" component={Modals}/>
                  <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                  <Route path="/components/switches" name="Swithces" component={Switches}/>
                  <Route path="/components/tables" name="Tables" component={Tables}/>
                  <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                  <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                  <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                  <Route path="/widgets" name="Widgets" component={Widgets}/>
                  <Route path="/charts" name="Charts" component={Charts}/>
                  <Route exact path="/categorias"  name="Categorias"  history={this.props.history} render={(props) => 
                    <Categorias {...props} authenticate={this.props.authenticate} auth={this.props.auth}/>}
                  />
                  <Route exact path="/lançamentos" name="Lançamentos" history={this.props.history} render={(props) => 
                    <Lançamentos {...props} authenticate={this.props.authenticate} auth={this.props.auth}/>}
                  />
                  <Redirect from="/" to={home}/>
                </Switch>
              </Container>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Full;
