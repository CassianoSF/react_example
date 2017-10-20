import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import '../style.css';
import * as api from '../../../api.js';
import Auth from 'j-toker';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let self = this;
    Auth.configure({apiUrl: api.url});
    Auth.emailSignIn(
      self.state)
    .then(res => {
        self.props.authenticate()
        self.props.history.push('/')
      }
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="login-content app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup className="mb-0">
                  <Card className="p-4">
                    <CardBlock className="card-body">
                      <h1>Login</h1>
                      <p className="text-muted">Entre em sua conta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                        <Input name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                        <Input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Senha"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={this.handleSubmit} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Esqueceu sua senha?</Button>
                          <a href="#/register">
                            <Button color="link" className="px-0">Registre-se</Button>
                          </a>
                        </Col>
                      </Row>
                    </CardBlock>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBlock className="card-body text-center">
                      <div>
                        <h2>Registre-se</h2>
                        <p>Crie sua conta para começar a cuidar do seu dindin agora mesmo.</p>
                        <a href="#/register">
                          <Button color="primary" className="mt-3" active>Registre-se aqui!</Button>
                        </a>
                      </div>
                    </CardBlock>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div> 
    );
  }
}

export default Login;
