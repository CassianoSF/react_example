import React, { Component } from 'react';
import axios from 'axios';
import CrudForm from './CrudForm.js'
import CrudShow from './CrudShow.js'
import CrudRecord from './CrudRecord.js'
import CrudIndex from './CrudIndex.js'
import Confirm from '../Confirm/Confirm.js'
import * as api from '../../api.js'
import './Crud.css'

import Auth from 'j-toker'

class Crud extends Component {
  constructor(props) {
    document.body.classList.add('aside-menu-hidden')
    super(props);   // api_path, columns, name, nesteds
    this.state = {
      list: [],
      target: null,
      new: false,
      edit: false,
      open: false,
      confirm: false,
    }

    this.new           = this.new.bind(this)
    this.edit          = this.edit.bind(this)
    this.create        = this.create.bind(this)
    this.update        = this.update.bind(this)
    this.delete        = this.delete.bind(this)
    this.index         = this.index.bind(this)
    this.closeForm     = this.closeForm.bind(this)
    this.closeConfirm  = this.closeConfirm.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.columns       = this.columns.bind(this)
    this.openShow      = this.openShow.bind(this)
    this.closeShow     = this.closeShow.bind(this)
  }

  componentDidMount(){
    this.index();
  }

  new(columns, route, refresh){
    this.setState({
           refresh: refresh,
            target: null,
              edit: false,
               new: true,
              open: true,
      form_columns: columns,
        form_route: route,
    });
  }

  edit(target, columns, route, refresh){
    this.setState({
           refresh: refresh,
            target: target,
              edit: true,
               new: false,
              open: true,
      form_columns: columns,
        form_route: route,
    });
  }

  closeForm(){
    this.setState({
            target: null,
              edit: false,
               new: false,
              open: false,
      form_columns: null,
    });    
  }

  confirmDelete(target, columns, route, refresh){
    this.setState({
         refresh: refresh,
         confirm: true, 
          target: target,
      form_route: route,
            text: "Tem certeza que deseja excluir " + target[columns[0].name] + "?"
    })
  }

  closeConfirm(){
    this.setState({
      confirm: false, 
    })
  }

  create(target){
    var self = this;
    axios.post( 
      self.state.form_route, 
      target,
      self.props.auth
    )
    .then(res =>{
      self.props.authenticate()
      self.closeForm()
      self.state.refresh("create", res.data)
    })
    .catch((err) => {
      if(err.response && err.response.status === 401){
        self.props.history.push("/login")
      }
    })
  }

  update(target){
    var self = this;
    axios.put( 
      self.state.form_route + '/' + self.state.target.id, 
      target,
      self.props.auth
    )
    .then(res =>{
      self.props.authenticate()
      self.closeForm()
      self.state.refresh("update", res.data)
    })
    .catch((err) => {
      if(err.response && err.response.status === 401){
        self.props.history.push("/login")
      }
    })
  }

  delete(target){
    var self = this;
    axios.delete( 
      self.state.form_route + '/' + self.state.target.id, 
      self.props.auth
    )
    .then(res =>{
      self.props.authenticate()
      self.state.refresh("delete", target)
      self.setState({ 
        confirm: false,
      })
    })
    .catch((err) => {
      if(err.response && err.response.status === 401){
        self.props.history.push("/login")
      }
    });
  }

  index(){
    var self = this;
    axios.get( 
      self.props.api_path, 
      self.props.auth
    )
    .then(res => {
      self.props.authenticate()
      self.setState({list: res.data})
    })
    .catch((err) => {
      if(err.response && err.response.status === 401){
        self.props.history.push("/login")
      }
    });
  }

  columns(action){
    return(this.props.columns.filter((col) => {
      return !col.only || col.only.filter(only => {return only === action}).lenght > 0
    }));
  }

  openShow(record){
    this.setState({
      list: this.state.list.map(rec =>{
        if (rec == record){
          rec['open'] = true
          return rec
        }else{
          return rec          
        }
      })
    })
  }

  closeShow(record){
    this.setState({
      list: this.state.list.map(rec =>{
        if(rec == record){
          rec['open'] = false
          return rec
        }else{
          return rec          
        }
      })
    })
  }

  render() {
    console.log(this.props.auth)
    return (
      <div className="container">
        <div className="animated fadeIn">
          <div className="card">
            <div className="row">
              <div className="">
                <div className="col-md-12 mt-3 ml-3 mr-3">
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-primary"><i className="fa fa-search"></i> Pesquisar</button>
                    </span>
                    <input type="text" id="input1-group2" name="input1-group2" className="form-control" placeholder={this.props.name}/>
                  </div>
                </div>
              </div>
            </div>
            <CrudIndex
                    columns={this.columns("index")}
                       list={this.state.list}
                        new={this.new}
                       edit={this.edit}
                    nesteds={this.props.nesteds}
                   openShow={this.openShow}
                  closeShow={this.closeShow}
              confirmDelete={this.confirmDelete}
                      route={this.props.api_path}
                    history={this.props.history}
            />
          </div>
            <CrudForm
              api_path={this.state.form_route || this.props.api_path}
                  name={this.props.name} 
               columns={this.state.form_columns || this.props.columns} 
               nesteds={this.props.nesteds}
                target={this.state.target} 
                 index={this.index}
                update={this.update}
                create={this.create}
                   new={this.state.new} 
                  edit={this.state.edit} 
                  open={this.state.open} 
                 close={this.closeForm} 
               history={this.props.history}
            />
            <Confirm 
                 open={this.state.confirm} 
                 text={this.state.text} 
                title={"Excluir " + this.props.name} 
               action={this.delete}
               params={this.state.target}
                close={this.closeConfirm} 
              history={this.props.history}
            />
        </div>
      </div>
    )
  }
}

export default Crud;
