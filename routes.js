import React from 'react'
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import App from './containers/App'
import About from './containers/About'
import Home from './containers/Home'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/home" />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
  </Route>
)