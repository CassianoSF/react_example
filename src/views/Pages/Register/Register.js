import React, {Component} from "react";
import {Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import '../style.css';
import * as api from '../../../api.js';
import Auth from 'j-toker';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      password_confirmation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    let self = this;
    Auth.configure({
      apiUrl: api.url, 
      confirmationSuccessUrl: function () {return "http://localhost:8080/#/login"}
    });

    Auth.emailSignUp(self.state)
      .then(res =>
        self.props.history.push('/login')
      );
  }

  render() {
    return (
      <div className="login-content app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBlock className="card-body p-4">
                  <h1>Registrar-se</h1>
                  <p className="text-muted">Crie sua conta</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>@</InputGroupAddon>
                    <Input name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email"/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input 
                      name="password" 
                      value={this.state.password} 
                      onChange={this.handleChange} 
                      type="password" 
                      placeholder="Senha"
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                    <Input 
                      name="password_confirmation" 
                      value={this.state.password_confirmation} 
                      onChange={this.handleChange} 
                      type="password" 
                      placeholder="Repetir senha"
                    />
                  </InputGroup>
                  <Button onClick={this.handleSubmit} color="success" block>Criar conta</Button>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
