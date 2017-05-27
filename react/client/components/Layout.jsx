import React from 'react'
import Nav from './Nav'
import {Link} from 'react-router'
import LoginBox from './LoginBox'
import SignUp from './SignUp'

class Layout extends React.Component {
render(){

  var {loginEmail, loginPassword, signInClick, signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm} = this.props
 
 var toDisplay = 
 <div>
 <Nav/>
 {this.props.children}

 </div>

 if(1===1){
  toDisplay =
  <div>
  <LoginBox signInClick={signInClick} loginEmail={loginEmail} loginPassword={loginPassword}/>

  <SignUp signUpClick={signUpClick} signUploginEmail={signUploginEmail} signUploginPassword={signUploginPassword}
  signUpPasswordConfirm={signUpPasswordConfirm}/>
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