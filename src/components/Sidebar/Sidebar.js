import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Auth from 'j-toker'


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }


  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  logout(){
    Auth.signOut();
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link sidebar-nav-link" to={'/lançamentos'} ><i className="fa fa-files-o"></i> Lançamentos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link sidebar-nav-link" to={'/categorias'} ><i className="fa fa-files-o"></i> Categorias</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link sidebar-nav-link" to={'/graficos'} ><i className="fa fa-files-o"></i> Gráficos</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
