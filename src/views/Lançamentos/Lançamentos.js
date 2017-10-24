import React, {Component} from "react";
import Crud from '../../components/Crud/Crud.js'
import * as api from '../../api.js' 
import axios from 'axios'
import Auth from 'j-toker'


class Lançamentos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
    }
    // this.getCategorias = this.getCategorias.bind(this)
  }

  componentDidMount() {
    this.getCategorias() 
  }

  getCategorias(){
    let self = this
    axios.get(
      api.categorias, 
      self.props.auth)
    .then(res =>{
      self.setState({categorias: res.data})
    }).catch((err) => {
      if(err.response && err.response.status === 401){
        self.props.history.push("/login")
      }
    });
  }

  render() {
    let columns = [
      {
        name: "tipo",
        type: "select",
        values: [
          {id: "receita", value: "Receita"},
          {id: "despesa", value: "Despesa"}
        ]
      },
      {
        name: "valor",
        type: "number"
      },
      {
        name: "descricao",
        type: "text"
      },
      {
        name: "categoria_id",
        type: "select",
        values: this.state.categorias && this.state.categorias.map(function(cat) {
                var hash = {}; 
                hash['value'] = cat.nome; 
                hash['id'] = cat.id;
                return hash;
        })
      }
    ]
    return (
      <Crud api_path={api.lançamentos} columns={columns} name={"Lançamentos"} auth={this.props.auth} authenticate={this.props.authenticate} history={this.props.history}/>
    )
  }
}

export default Lançamentos;