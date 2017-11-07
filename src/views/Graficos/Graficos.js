import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import axios from "axios"
import * as api from '../../api.js'

class Graficos extends Component {
  constructor(props){
    super(props)
    this.state = {
      lançamentos: [],
      categorias: [],
    }
    this.radar = this.radar.bind(this)
    this.pie   = this.pie.bind(this)
    this.line  = this.line.bind(this)
    this.bar   = this.bar.bind(this)
    this.saldos_por_data = this.saldos_por_data.bind(this)
  }

  componentDidMount(){
    this.getLançamentos()
    this.getCategorias()
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

  saldos_por_data(){
    let saldos = []
    this.state.lançamentos.map((lan, i) => {
      if(i === 0){
        saldos.push((lan.tipo === "receita") ? lan.valor : -lan.valor)
      }else{
        if(lan.tipo === "receita"){
          saldos.push(saldos[i-1] + lan.valor)
        }else{
          saldos.push(saldos[i-1] - lan.valor)
        }
      }
    })
    return saldos
  }

  line(){
    return {
      labels: this.state.lançamentos.map(l => l.created_at.replace("-", "/").replace("-", "/").replace("T", " - ").slice(0, -5)),
      datasets: [
        {
          label: 'Saldo',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.saldos_por_data()
        }
      ]
    };
  }

  bar(){
    return {
      labels: this.state.categorias.map(c => c.nome),
      datasets: [
        {
          label: 'Total da categoria',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.categorias.map(c => this.state.lançamentos.filter(l => l.categoria_id === c.id).reduce((sum, l)=> sum+l.valor, 0 ).toFixed(2))
        }
      ]
    }
  }

  radar(){
    return {
      labels: this.state.categorias.map(c => c.nome),
      datasets: [
        {
          label: 'Categorias',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.state.categorias.map(c => this.state.lançamentos.filter(l => l.categoria_id === c.id).reduce((sum, l)=> sum+l.valor, 0 ).toFixed(2))
        }
      ]
    };
  }

  pie(){
    return {
      labels: this.state.categorias.map(c => c.nome),
      datasets: [
        {
          data: this.state.categorias.map(c => this.state.lançamentos.filter(l => l.categoria_id === c.id).reduce((sum, l)=> sum+l.valor, 0 ).toFixed(2)),
          backgroundColor: this.state.categorias.map(c => c.cor),
          hoverBackgroundColor: this.state.categorias.map(c => c.cor)
        }
      ]
    };
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="card-columns cols-2">
          <div className="card">
            <div className="card-header">
              Saldo
              <div className="card-actions">
                <a href="http://www.chartjs.org"><small className="text-muted">docs</small></a>
              </div>
            </div>
            <div className="card-block">
              <div className="chart-wrapper">
                <Line data={this.line()}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Barras de categorias
              <div className="card-actions">
                <a href="http://www.chartjs.org"><small className="text-muted">docs</small></a>
              </div>
            </div>
            <div className="card-block">
              <div className="chart-wrapper">
              <Bar data={this.bar()}
                options={{
                  maintainAspectRatio: false
                }}
              />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Radar de categorias
              <div className="card-actions">
                <a href="http://www.chartjs.org"><small className="text-muted">docs</small></a>
              </div>
            </div>
            <div className="card-block">
              <div className="chart-wrapper">
                <Radar data={this.radar()} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Pie Chart de categorias
              <div className="card-actions">
                <a href="http://www.chartjs.org"><small className="text-muted">docs</small></a>
              </div>
            </div>
            <div className="card-block">
              <div className="chart-wrapper">
                <Pie data={this.pie()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Graficos;
