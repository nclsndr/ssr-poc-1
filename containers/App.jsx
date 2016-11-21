import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const propTypes = {
  children: PropTypes.object
}

class App extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="app_main">
        <h3>AppLayer</h3>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = propTypes

export default App
