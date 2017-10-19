import React, {Component} from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="" navbar>
          <NavItem className="px-3">
            <NavLink href="#">Home</NavLink>
          </NavItem>
        </Nav>
        <Nav className="mr-4 ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <span>Minha conta</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem><i className="fa fa-lock"></i> Mudar senha</DropdownItem>
                <DropdownItem><i className="fa fa-lock"></i> Perfil</DropdownItem>
                <DropdownItem><i className="fa fa-lock"></i> Sair</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    )
  }
}

export default Header;
