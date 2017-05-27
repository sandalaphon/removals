import React from 'react'
import {Link} from 'react-router'
import store from '../store.js'

class SignUp extends React.Component {

  handleChangeSignUpEmail(event){
    event.preventDefault()
    this.props.signUploginEmail(event.target.value)
  }

  handleChangeSignUpPassword(event){
    event.preventDefault()
    this.props.signUploginPassword(event.target.value)
  }

  handleChangeSignUpPasswordConfirm(event){
    event.preventDefault()
    this.props.signUpPasswordConfirm(event.target.value)
  }

  handleSignUpClick(event){
    event.preventDefault()
    console.log(store.getState())
    const {signup_email, signup_password,signup_password_confirm} = store.getState().loginDetails
    console.log("signup_email", signup_email)
    this.props.signUpClick(signup_email, signup_password,signup_password_confirm)

  }


  render(){
    return(
      <div>
      <h1>We are SignUp</h1>
      {console.log(this.props)}

      <input type = 'text' className="sign_in_email" placeholder = "email" onChange={this.handleChangeSignUpEmail.bind(this)}/>


      <input type = 'text' className="sign_in_password" placeholder = "password" onChange={this.handleChangeSignUpPassword.bind(this)}/>

      <input type = 'text' className="sign_in_password" placeholder = "confirm password" onChange={this.handleChangeSignUpPasswordConfirm.bind(this)}/>

      <input type = 'submit' className="sign_in_button" value="Sign In" onClick = {this.handleSignUpClick.bind(this)}/>
      </div>
      )
  }
}

export default SignUp