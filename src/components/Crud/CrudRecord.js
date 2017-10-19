import React, { Component } from 'react';
import CrudValue from './CrudValue.js';

export default class CrudRecord extends Component {
  constructor(props) {
    super(props);
    this.toogleShow = this.toogleShow.bind(this)
  }

  toogleShow(record){
    if(this.props.record.open)
      this.props.closeShow(record)
    else
      this.props.openShow(record)
  }

  render(){
    let record = this.props.record
    return(
      <tr key={record.id}>
        {this.props.columns.map(column =>
          <td key={column.name+"Body"}>
            <CrudValue 
              column={column} 
              value={record[column.name]}
              record={record}
            />
          </td>
        )}
        <td title="Editar" onClick={() => this.props.edit(record, this.props.columns, this.props.route, this.props.refresh)}><i className="fa fa-pencil" /></td>
        <td title="Excluir" onClick={() => this.props.confirmDelete(record, this.props.columns, this.props.route, this.props.refresh)}><i className="fa fa-trash" /></td>
        {this.props.nesteds ? <td title="Abrir" onClick={() => this.toogleShow(record)}><i className="fa fa-search" /></td> : null}
      </tr>
    )
  }
}