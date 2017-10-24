import React, { Component } from 'react';
import { 
  // Alert, 
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader, 
  Button, 
  Form, 
  FormGroup, 
  Label,
  // Input 
} from 'reactstrap';

import CrudInput from './CrudInput.js';

export default class CrudForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.target

    this.confirmar  = this.confirmar.bind(this);
    this.alert      = this.alert.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.mySetState = this.mySetState.bind(this);
  }
 
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.target !== this.props.target){
      this.setState(this.props.target)
    }
  }

  alert(data){
    this.setState({
      alert: data,
    })
  }

  confirmar(){
    this.props.target ?
      this.props.update(this.state) : this.props.create(this.state)
    this.props.close()
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  mySetState(params){
    this.setState( params )
  }

  render() {
    return(
      <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className}>
        <ModalHeader>{this.props.target ? "Editar "+this.props.name : "Nova target"+this.props.name}</ModalHeader>
        <ModalBody>
          <div>
            <Form>
            {this.props.columns.map(column =>
              <FormGroup key={column.name + "FromGroup"}>
                <Label for={column.name}>{this.capitalize(column.name).replace("_id", "")}</Label>
                <CrudInput 
                  column={column.name} 
                  info={column}
                  value={this.props.target && this.props.target[column.name]}
                  parentSetState={this.mySetState}
                />
              </FormGroup>
            )}
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.confirmar()}>Confirmar</Button>
          <Button color="secondary" onClick={() => this.props.close()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

