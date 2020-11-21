import React, { Component } from 'react'
import { connect } from 'react-redux'
import InAppNavBar from './InAppNavBar'
import cognitoUtils from '../lib/cognitoUtils'
import Dashboard from './Dashboard';
import Payroll from './Payroll';
import AboutMe from './AboutMe';
import Admin from './Admin';
const mapStateToProps = state => {
  return { session: state.session }
}

class AuthApp extends Component {
			
  constructor(props) {
  super(props);
  let handleToUpdate	= this.handleToUpdate.bind(this);
  let onSignOut = this.onSignOut.bind(this);
  this.state = {currentPage: 'Dashboard'};
}

handleToUpdate(someArg){
    this.setState({currentPage:someArg});
}

onSignOut(e){
  e.preventDefault()
  cognitoUtils.signOutCognitoSession()
}

renderPage(page) {
  switch(page) {
    case 'Dashboard':
      let username = this.props.name || 'noname';
      return (<Dashboard user={this.props.user}/>)
    case 'Payroll':
      return (<Payroll user={this.props.user}/>)
    case 'Username':
      return (<AboutMe user={this.props.user}/>)
    case 'Logout':
      return (<h1> Display Page {this.state.currentPage}</h1>)
    case 'Admin':
      return (<Admin user={this.props.user}/>)

  }
}

render() {
    let	handleToUpdate	=	this.handleToUpdate;
    return (
          <div>
            <InAppNavBar handleToUpdate = {handleToUpdate.bind(this)} signOut={this.onSignOut} user={this.props.user}/>
            {this.renderPage(this.state.currentPage)}
          </div>
      )
  }
}

export default connect(mapStateToProps)(AuthApp)
