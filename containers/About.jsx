import React, { Component, PropTypes } from 'react'

const propTypes = {
  aboutData: PropTypes.string
}

class About extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="about_page">
        <h1>About page</h1>
        <p>{this.props.aboutData}</p>
      </div>
    )
  }
}

About.propTypes = propTypes

export default About
