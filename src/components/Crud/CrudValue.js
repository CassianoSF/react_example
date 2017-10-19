import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class CrudValue extends Component {
  // props: column, value

  setValue(){
    if(this.props.column.type === "bool"){
      return this.boolValue();
    }else if(this.props.column.type === "select" && this.props.value){
      return this.idValue();
    }else if(this.props.column.type === "color"){
      return this.colorValue();
    }else{
      return this.props.value
    }
  }

  colorValue(){
    return (
      <div style={{backgroundColor: this.props.value, height: "20px", width: "20px"}} title={this.props.value}>
      </div>
    )
  }

  boolValue(){
    return(
      <span className={(this.props.value) ? "badge badge-success" : "badge badge-danger"} >
        {this.props.value ? "sim" : "nao"}
      </span>
    )
  }

  idValue(){
    var self = this;
    return(
      this.props.column.values.filter(function(value) {
        return (value['id'] === self.props.value)
      })[0]['value']
    )
  }

  render() {
    if(this.props.column.link){
      return (
         <NavLink to={this.props.column.link.path} onClick={() => this.props.column.link.action(this.props.record)}>
            {this.setValue()}
         </NavLink>
        )
    }
    else{
      return (
        <div>
          {this.setValue()}
        </div>
      )
    }
  }
}

export default CrudValue;