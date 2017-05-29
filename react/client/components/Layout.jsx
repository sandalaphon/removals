import React from 'react'
import Nav from './Nav'
import {Link} from 'react-router'
import LoginBox from './LoginBox'
import SignUp from './SignUp'

class Layout extends React.Component {

  componentDidMount(){
    this.props.fetchUser()
  }
render(){

  var {loginEmail, loginPassword, signInClick, signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm,  signOut } = this.props

  var {user_email, user_password} = this.props.loginDetails


 
 var toDisplay ;
 if(this.props.loginDetails.currentUser){

 toDisplay = 
 <div>
 <Nav signOut={signOut} displayEmail={this.props.loginDetails.currentUser.email}/>
 {this.props.children}

 </div>
}
 if(!this.props.loginDetails.currentUser){
  toDisplay =
  <div>
  <LoginBox signInClick={signInClick} loginEmail={loginEmail} user_email={user_email} user_password={user_password} loginPassword={loginPassword} />

  
  </div>
 }
  return(
  <div>
   {toDisplay}
   </div>
    )
}
}

export default Layout

// <SignUp signUpClick={signUpClick} signUploginEmail={signUploginEmail} signUploginPassword={signUploginPassword}
// signUpPasswordConfirm={signUpPasswordConfirm}/>