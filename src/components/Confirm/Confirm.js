import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

export default class Confirm extends Component {
  constructor(props) {
    super(props); 
    this.action = this.action.bind(this);
  }

  action(){
    this.props.action(this.props.params);
  }

  render(){
    return(
      <div>
        <Modal isOpen={this.props.open} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.text}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.action}>Confirm</Button>
            <Button color="secondary" onClick={this.props.close}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}