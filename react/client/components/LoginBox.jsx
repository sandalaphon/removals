import React from 'react'
import {Link} from 'react-router'
import SignUp from './SignUp'

class LoginBox extends React.Component {

  

  handleChangeEmail(event){
    event.preventDefault()
    this.props.loginEmail(event.target.value)
  }

  handleChangePassword(event){
    event.preventDefault()
    this.props.loginPassword(event.target.value)
  }

  handleSignInClick(event){
    event.preventDefault()

    this.props.signInClick(this.props.user_email, this.props.user_password)

  }


  render(){
    return(
      <div>
      <h1>We are LoginBox</h1>

      <input type = 'text' className="sign_in_email" placeholder = "email" onChange={this.handleChangeEmail.bind(this)}/>


      <input type = 'text' className="sign_in_password" placeholder = "password" onChange={this.handleChangePassword.bind(this)}/>

      <input type = 'submit' className="sign_in_button" value="Sign In" onClick = {this.handleSignInClick.bind(this)}/>
      <SignUp/>
      </div>
      )
  }
}

export default LoginBox