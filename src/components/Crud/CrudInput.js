import React, { Component } from 'react';
import { SliderPicker } from 'react-color'

export default class CrudInput extends Component {
  constructor(props) {
    super(props);  // column, info, value, parentSetState
    this.state = {value: this.props.value}
    this._onChange = this._onChange.bind(this);
    this._booleanOnChange = this._booleanOnChange.bind(this);
    this._colorOnChange = this._colorOnChange.bind(this);
    
    this._select = this._select.bind(this);
    this._boolean = this._boolean.bind(this);
    this._color = this._color.bind(this);
    this._text = this._text.bind(this);
  }

    
  componentWillMount() {
    if(this.props.info.type === "select" || this.props.info.type === "categoria" ){
      this.props.parentSetState({ 
        [this.props.column]: (this.props.value || this.props.info.values[0] && this.props.info.values[0].id) 
      })
    }
    this.setState({ value: this.props.value });
  }
  
  _onChange(e) {
    this.props.parentSetState({ [e.target.name]: e.target.value });
  }

  _colorOnChange(color, e) {
    this.setState({ value: color.hex });
    this.props.parentSetState({ [this.props.column]: color.hex });
  }

  _booleanOnChange(e) {
    this.props.parentSetState({ [e.target.name]: e.target.checked });
  }

  _select(){
    let self = this;
    return (
      <select 
        name={this.props.column} 
        className="form-control" 
        defaultValue={this.props.value || this.props.info.values[0] && this.props.info.values[0].id} 
        onChange={this._onChange}> 
        {this.props.info.values.map(op =>
            <option key={op.id+"Key"} value={op.id}>{op.value}</option>
        )}
      </select>
    )
  }

  _boolean(){
    return (
      <label className="switch switch-default switch-pill switch-primary">
        <input 
          name={this.props.column} 
          className="switch-input" 
          type="checkbox" 
          defaultChecked={this.props.value} 
          onChange={this._booleanOnChange}
        />
        <span className="switch-label"></span>
        <span className="switch-handle"></span>
      </label>
    )
  }

  _color(){
    return(
      <div> 
        <SliderPicker
          color={this.state.value || "#0f0"}
          onChangeComplete={this._colorOnChange}
        /> 
      </div> 
    )
  }

  _text(){
    return (
      <input 
        name={this.props.column} 
        className="form-control" 
        type={this.props.info} 
        defaultValue={this.props.value} 
        onChange={this._onChange} 
      />
    )
  }
  
  _number(){
    return (
      <input 
        name={this.props.column} 
        className="form-control" 
        type={this.props.info} 
        defaultValue={this.props.value && this.props.value.toFixed(2)} 
        onChange={this._onChange} 
      />
    )
  }

  _categoria(){
    return this._select()
  }
  

  input(){
    if(this.props.info.type === "select"){
      return this._select();
    }
    else if(this.props.info.type === "bool"){
      return this._boolean();
    }
    else if(this.props.info.type === "color"){
      return this._color();
    }
    else if(this.props.info.type === "text"){
      return this._text();
    }
    else if(this.props.info.type === "number"){
      return this._number();
    }
    else if(this.props.info.type === "categoria"){
      return this._select();
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