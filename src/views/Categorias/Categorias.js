import React, {Component} from "react";
import Crud from '../../components/Crud/Crud.js'
import * as api from '../../api.js' 


class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
    }
  }

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
      <Crud 
        api_path={api.categorias} 
        columns={columns} 
        name={"Categorias"} 
        auth={this.props.auth} 
        authenticate={this.props.authenticate} 
        history={this.props.history}
      />
    )
  }
}

export default Categorias;