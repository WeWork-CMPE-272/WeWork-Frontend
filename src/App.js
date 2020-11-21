import React from 'react'
import {
  Router,
  Route
} from 'react-router-dom'
import Callback from './components/Callback'
import Home from './components/Home'
import About from './components/About'
import Health from './components/Health'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => (

  <Router history={history}>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} /> 
    <Route exact path="/callback" component={Callback} />
    <Route exact path="/health" component={Health} />
  </Router>
)

export default App
