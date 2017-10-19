import React, {Component} from "react";
import Crud from '../../components/Crud/Crud.js'
import * as api from '../../api.js' 


class Categorias extends Component {
  render() {
    let columns = [
      {
        name: "nome",
        type: "text"
      },
      {
        name: "cor",
        type: "color"
      },
    ]
    return (
      <Crud api_path={api.categorias} columns={columns} name={"Categorias"} history={this.props.history}/>
    )
  }
}

export default Categorias;