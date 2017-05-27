import React from 'react'
import {Link} from 'react-router'
import store from '../store.js'

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
    const {user_email, user_password} = store.getState().loginDetails
    event.preventDefault()
    this.props.signInClick(user_email, user_password)

  }


  render(){
    return(
      <div>
      <h1>We are LoginBox</h1>
      {console.log(this.props)}

      <input type = 'text' className="sign_in_email" placeholder = "email" onChange={this.handleChangeEmail.bind(this)}/>


      <input type = 'text' className="sign_in_password" placeholder = "password" onChange={this.handleChangePassword.bind(this)}/>

      <input type = 'submit' className="sign_in_button" value="Sign In" onClick = {this.handleSignInClick.bind(this)}/>
      </div>
      )
  }
}

export default LoginBox