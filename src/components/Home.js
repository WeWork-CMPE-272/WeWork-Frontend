import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import background from '../assets/image.jpeg';
import './Home.css'
import { connect } from 'react-redux'
import config from '../config/index'
import HomeNavBar from '../components/HomeNavBar'
import AuthApp from '../components/AuthApp';
import { Container, Row, Col } from 'react-bootstrap'
import request from '../lib/http'
const mapStateToProps = state => {
  return { session: state.session }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  async componentDidMount() {
    if (this.props.session.isLoggedIn) {
      // Call the API server GET /users endpoint with our JWT access token
      console.log(config);
      let response = null;
      try {
        console.log(this.props.session);
        const username = this.props.session.user.userName;
        console.log(config.loginUri);
        response = await request({
          method: 'GET',
          uri: `${config.loginUri}/getUser/${username}`,
          resolveWithFullResponse: true,
        })
        const user = JSON.parse(response.body);
        this.setState({ user })
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    console.log('Rendering');
    return (
      <div className="Home">
        <Container>
          {this.props.session.isLoggedIn ? (
            <AuthApp user={this.state.user} />
          ) : (<div>
            <HomeNavBar />
            <header className="Home-header">
              <img src={logo} className="Home-logo" alt="logo" />
                <div>
                  <h1>We Work HR Solutions</h1>
                  <p>An Enterprise HR Solution</p>
                </div>
            </header>
          </div>
            )}</Container>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
