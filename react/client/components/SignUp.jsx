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
    const checkbox = document.querySelector('#admin_checkbox')

    const {signup_email, signup_password,signup_password_confirm} = store.getState().loginDetails
    if(checkbox.checked){
      this.props.signUpClick(signup_email, signup_password,signup_password_confirm, true)
    }else{
    this.props.signUpClick(signup_email, signup_password,signup_password_confirm,false)
}
  }


  render(){
    const checkbox = <input type = 'checkbox' id="admin_checkbox" />
    return(
      <div>
      <h1>We are SignUp</h1>

      <input type = 'text' className="sign_in_email" placeholder = "email" onChange={this.handleChangeSignUpEmail.bind(this)}/>


      <input type = 'text' className="sign_in_password" placeholder = "password" onChange={this.handleChangeSignUpPassword.bind(this)}/>

      <input type = 'text' className="sign_in_password" placeholder = "confirm password" onChange={this.handleChangeSignUpPasswordConfirm.bind(this)}/>

      {checkbox}

      <input type = 'submit' className="sign_in_button" value="Sign In" onClick = {this.handleSignUpClick.bind(this)}/>
      </div>
      )
  }
}

export default SignUp