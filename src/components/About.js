import React, { Component } from 'react'
import './Home.css'
import HomeNavBar from '../components/HomeNavBar'
import { Container } from 'react-bootstrap'


class About extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }
 
render() {
    console.log('Rendering');
    return (
        <div className="Home">
            <Container>
                <HomeNavBar />
                <header className="Home-header" style={{ 'text-align': 'left', 'padding': '5rem', 'font-size': 'calc(10px + 1.5vmin)' }}>
                    <div>
                        <h1>Welcome to We-Work HR&nbsp;</h1>
                        <p>We-Work Hr is an enterprise HR solution built by <strong>Bharath Gunasekaran</strong> and <strong>Tamanna Mehta</strong>.&nbsp;</p>
                        <div>
                            <h2>Features</h2>
                            <div>Login&nbsp;&amp;&nbsp;SSO&nbsp;integration&nbsp;using&nbsp;AWS&nbsp;Cognito&nbsp;&amp;&nbsp;Google&nbsp;OAuth</div>
                            <div>&nbsp;</div>
                            <div>Employees can view their information:</div>
                            <ul>
                                <li>Payroll</li>
                                <li>Employee details</li>
                            </ul>
                            <div>Administrator can&nbsp;&nbsp;</div>
                            <ul>
                                <li>Create Employee accounts</li>
                                <li>Promote Employee</li>
                            </ul>

                        </div>
                    </div>
                </header>
            </Container>
        </div>
    )
}
}

export default (About)
