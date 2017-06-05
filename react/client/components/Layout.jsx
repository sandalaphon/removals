import React from 'react'
import Navb from './Navb'
import {Link} from 'react-router'
import LoginBox from './LoginBox'
import SignUp from './SignUp'

class Layout extends React.Component {

  componentDidMount(){
    this.props.fetchUser()
  }
render(){

  var {loginEmail, loginPassword, signInClick, signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm,  signOut, addUser, getUsers } = this.props

  var {user_email, user_password} = this.props.loginDetails


 
 var toDisplay ;
 if(this.props.loginDetails.currentUser){

 toDisplay = 
 <div>
 <Navb signOut={signOut} displayEmail={this.props.loginDetails.currentUser.email}
    />

  {this.props.children}
 </div>
}
 if(!this.props.loginDetails.currentUser){
  toDisplay =
  <div>
  <LoginBox signInClick={signInClick} loginEmail={loginEmail} user_email={user_email} user_password={user_password} loginPassword={loginPassword} 
    signUpClick={signUpClick} 
    signUploginEmail={signUploginEmail} 
    signUpPasswordConfirm={signUpPasswordConfirm} 
    signUploginPassword={signUploginPassword}
    getUsers ={getUsers}
  />

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

 // <Navb signOut={signOut} displayEmail={this.props.loginDetails.currentUser.email}
   // />
 // {this.props.children}
