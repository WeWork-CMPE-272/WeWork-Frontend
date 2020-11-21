import React, { Component } from 'react'

/**
  Callback route used after a successful Cognito sign-in. The window URL will contain the code we can
  use to get a Cognito session, which includes JWT tokens etc
 */
class Health extends Component {

    render() {
        return <h1>I am Alive</h1>
    }
}

export default Health
