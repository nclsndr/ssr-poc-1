import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const propTypes = {
  homeData: PropTypes.string,
  counter: PropTypes.number
}

class Home extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="home_page">
        <h1>Home page</h1>
        <p>{this.props.homeData}</p>
        <p>Counter value {this.props.counter}</p>
      </div>
    )
  }
}

Home.propTypes = propTypes

export default connect(state => ({
  counter: state.counter,
}))(Home)
