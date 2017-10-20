import React, { Component } from 'react';
import { SliderPicker } from 'react-color'

export default class CrudInput extends Component {
  constructor(props) {
    super(props);  // column, info, value, parentSetState
    this.state = {value: this.props.value}
    this.onChange = this.onChange.bind(this);
    this.swithOnChange = this.swithOnChange.bind(this);
    this.selectInput = this.selectInput.bind(this);
    this.switchInput = this.switchInput.bind(this);
    this.colorInput = this.colorInput.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
  }

    
  componentWillMount() {
    if(this.props.info.type === "select"){
      this.props.parentSetState({ 
        [this.props.column]: (this.props.value || this.props.info.values[0] && this.props.info.values[0].id) 
      })
    }
    this.setState({ value: this.props.value });
  }
  
  onChange(e) {
    this.props.parentSetState({ [e.target.name]: e.target.value });
  }

  onChangeColor(color, e) {
    this.setState({ value: color.hex });
    this.props.parentSetState({ [this.props.column]: color.hex });
  }

  swithOnChange(e) {
    this.props.parentSetState({ [e.target.name]: e.target.checked });
  }

  selectInput(){
    let value;
    let self = this;
    if(this.props.value){
      value = (
        this.props.info.values.filter(function(value) {
          return (value['id'] === self.props.value)
        })[0]['value']
      )
    }else if(this.props.info.values[0]){
      return (
        <select 
          name={this.props.column} 
          className="form-control" 
          defaultValue={this.props.value || this.props.info.values[0].id} 
          onChange={this.onChange}> 
          {this.props.info.values.map(op =>
              <option key={op.id+"Key"} value={op.id}>{op.value}</option>
          )}
        </select>
      )
    }
  }

  switchInput(){
    return (
      <label className="switch switch-default switch-pill switch-primary">
        <input name={this.props.column} className="switch-input" type="checkbox" defaultChecked={this.props.value} onChange={this.swithOnChange}/>
        <span className="switch-label"></span>
        <span className="switch-handle"></span>
      </label>
    )
  }

  colorInput(){
    return(
      <div> 
        <SliderPicker
          color={this.state.value || "#0f0"}
          onChangeComplete={this.onChangeColor}
        /> 
      </div> 
    )
  }
  

  input(){
    if(this.props.info.type === "select"){
      return this.selectInput();
    }
    else if(this.props.info.type === "bool"){
      return this.switchInput();
    }else if(this.props.info.type === "color"){
      return this.colorInput();
    }else{
      return (
        <input name={this.props.column} className="form-control" type={this.props.info} defaultValue={this.props.value} onChange={this.onChange}  />
      )
    }
  }

  render() {
    return(
      <div>
        {this.input()}
      </div>
    )
  }
}