import React, { Component } from 'react';
import './NavBar.css';
import { connect } from 'react-redux'
import cognitoUtils from '../lib/cognitoUtils'
import { Container, Row, Col } from 'react-bootstrap';

const mapStateToProps = state => {
  return { session: state.session }
}


class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.session);
    return (
      
      <div class="topnav">
      <a class="active" href="/">WeWork HR</a>
      <a href="/about">About</a>
      <div class="login-container">
        <a href={cognitoUtils.getCognitoSignInUri()}>Login</a>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps)(NavBar)
