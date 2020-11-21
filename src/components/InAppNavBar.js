import React, { Component } from 'react';
import './NavBar.css';


class InAppNavBar extends Component {

  render() {
    let handleToUpdate = this.props.handleToUpdate;
    let onSignOut = this.props.signOut;
    let user = this.props.user || {};
    let username = `${user.firstName} ${user.lastName}` || 'Noname';
    let admin = this.props.user.admin || false;
    return (
      <div class="topnav">
        <a>WeWork HR</a>
        <a onClick={() => handleToUpdate('Dashboard')}>Dashboard</a>
        <a onClick={() => handleToUpdate('Payroll')}>Payroll</a>
        { admin ?
          (<a onClick={() => handleToUpdate('Admin')}>Admin Console</a>) : console.log('not admin')
        }
        <div class="login-container">
          <a onClick={(event) => onSignOut(event)}>Logout</a>
          <a onClick={() => handleToUpdate('Username')}>{username}</a>
        </div>
      </div>
    )
  }
}
export default InAppNavBar