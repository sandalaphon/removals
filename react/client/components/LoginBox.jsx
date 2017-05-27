import React from 'react'
import {Link} from 'react-router'

class LoginBox extends React.Component {
  render(){
    return(
      <div>
      <h1>We are LoginBox</h1>
      {this.props.children}
      <Link to = "home"> Home</Link>
      </div>
      )
  }
}

export default LoginBox