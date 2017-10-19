import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import CrudIndex from '../../components/Crud/CrudIndex.js';
import './Crud.css'

export default class CrudShow extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeTab: '0'
    }
  }

  render(){
    if(this.props.record.open)
      return(
        <tr className="eceff1">
          <td colSpan={this.props.columns.length + 3}>
            <div className="animated fadeIn m-3">
              <Nav tabs>
                {this.props.nesteds.map((nested_tab, index) =>
                  <NavItem key={String(index)}>
                    <NavLink 
                     className={classnames({ active: this.state.activeTab === String(index) })}
                     onClick={() => { this.toggle(String(index), nested_tab); }}>
                      {nested_tab.name}
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              
              <TabContent className="tab-content-parede" activeTab={this.state.activeTab}>
                {this.props.nesteds.map((nested_tab, index) =>
                  <TabPane className="tab-pane-parede" key={String(index)} tabId={String(index)}>
                    
                    <CrudIndex 
                               list={this.props.record[nested_tab.name]} 
                            columns={nested_tab.columns} 
                               name={nested_tab.name} 
                                new={this.props.new}
                               edit={this.props.edit}
                           openShow={this.props.openShow}
                          closeShow={this.props.closeShow}
                      confirmDelete={this.props.confirmDelete}
                              route={this.props.api_path + this.props.record.id + nested_tab.route}
                            history={this.props.history}
                    />

                  </TabPane>
                )}
              </TabContent>
            </div>
          </td>
        </tr>
      )
    else
      return null
  }
}