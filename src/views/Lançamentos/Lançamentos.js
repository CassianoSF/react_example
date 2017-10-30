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
      lançamentos: []
    }
  }

  componentDidMount() {
    this.getCategorias() 
    this.getLançamentos()
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

  getLançamentos(){
    let self = this
    axios.get(
      api.lançamentos, 
      self.props.auth)
    .then(res =>{
      self.setState({lançamentos: res.data})
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
        type: "categoria",
        values: [
          {id: "receita", value: "Receita", cor:"#0D0"},
          {id: "despesa", value: "Despesa", cor:"#D00"}
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
        type: "categoria",
        values: this.state.categorias && this.state.categorias.map(function(cat) {
                var hash = {}; 
                hash['value'] = cat.nome; 
                hash['id'] = cat.id;
                hash['cor'] = cat.cor;
                return hash;
        })
      }
    ]
    let total_receitas = this.state.lançamentos.filter((l)=> l.tipo === 'receita' ).map(l => l.valor).reduce((a, b)=> a+b, 0)
    let total_despesas = this.state.lançamentos.filter((l)=> l.tipo === 'despesa' ).map(l => l.valor).reduce((a, b)=> a+b, 0)
    let saldo = total_receitas - total_despesas
    return (
      <div>
        <div className="btn btn-lg btn-success m-3 ">Receitas: R$ {total_receitas.toFixed(2)} </div>
        <div className="btn btn-lg btn-danger m-3 ">Despesas: R$ {total_despesas.toFixed(2)} </div>
        <div className="btn btn-lg btn-primary m-3 ">Saldo: R$  {saldo.toFixed(2)} </div>
        <Crud api_path={api.lançamentos} columns={columns} name={"Lançamentos"} auth={this.props.auth} authenticate={this.props.authenticate} history={this.props.history}/>
      </div>
    )
  }
}

export default Lançamentos;