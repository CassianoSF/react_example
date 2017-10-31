import React, { Component } from 'react';
import CrudShow from './CrudShow.js'
import CrudRecord from './CrudRecord.js'

class CrudIndex extends Component {
  constructor(props) {
    super(props);
    this.state={
      list: this.props.list
    } 
    this.refresh = this.refresh.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list){
      this.setState({list: this.props.list})
    }
  }

  refresh(action, data){
    (action === "delete") ?
      this.setState({list: this.state.list.filter(record => record !== data)})
    : (action === "create") ?
      this.setState({list: this.state.list.concat([data])})
    : (action === "update") ?
      this.setState({list: this.state.list.map(record => record.id === data.id ? data : record)})
    : false
  }

  humanize(str) {
    return str.toString().toLowerCase()
      .replace(/[_-]/g, ' ')
      .replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
  }

  render() {
    return (
      <div className="card-block">
        <table className="table">
          <thead>
            <tr>
              {this.props.columns.map(column =>
                <th key={column.name + "Head"}>{this.humanize(column.name.replace("_id", "").replace("created_at", "data")).replace("cao", "ção")}</th>// ---- I18n rs...
              )}
              <th></th>
              <th></th>
              {this.props.nesteds ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(record =>
              [
                <CrudRecord 
                            key={"CrudRecord_"+ record.id} 
                         record={record} 
                        columns={this.props.columns} 
                           edit={this.props.edit} 
                       openShow={this.props.openShow} 
                      closeShow={this.props.closeShow} 
                  confirmDelete={this.props.confirmDelete} 
                        nesteds={this.props.nesteds}
                          route={this.props.route}
                        refresh={this.refresh}
                        history={this.props.history}
                />,
                <CrudShow
                            key={"CrudShow_"+ record.id}
                         record={record}
                        columns={this.props.columns}
                        nesteds={this.props.nesteds}
                            new={this.props.new}
                           edit={this.props.edit}
                       openShow={this.props.openShow}
                      closeShow={this.props.closeShow}
                  confirmDelete={this.props.confirmDelete}
                       api_path={this.props.route}
                        history={this.props.history}
                />
              ]
            )}
          </tbody>
        </table>
        <div className="pull-right" onClick={() => this.props.new(this.props.columns, this.props.route, this.refresh)}>
          <i className="fa fa-plus"></i> Adicionar
        </div>
      </div>
    )
  }
}

export default CrudIndex;
