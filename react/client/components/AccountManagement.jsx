import React from 'react'
import SignUp from './SignUp'
import UserList from './UserList'

class AccountManagement extends React.Component {

  componentWillMount(){

    this.props.getUsers()
    
    
  }

  render(){
    var {signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm, getUsers} = this.props
    
    return(
      
      <div>
      <p>We are AccountManagement</p>
       <SignUp 
       signUpClick={signUpClick} 
       signUploginEmail={signUploginEmail} 
       signUploginPassword={signUploginPassword}
       signUpPasswordConfirm={signUpPasswordConfirm}/>
       <UserList updateAdmin={this.props.updateAdmin} users={this.props.loginDetails}/>

          
      </div>
      )
       }
  }


export default AccountManagement


