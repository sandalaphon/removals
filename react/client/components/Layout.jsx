import React from 'react'
import Navb from './Navb'
import {Link} from 'react-router'
import LoginBox from './sign_in/LoginBox'
import SignUp from './account_management/SignUp'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


class Layout extends React.Component {

  componentDidMount(){
    this.props.actions.fetchUser()
  }

  render(){

    var {loginEmail, loginPassword, signInClick, signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm,  signOut, addUser, getUsers, getAllTripsFromRails } = this.props.actions
    var {user_email, user_password} = this.props.loginDetails
    var toDisplay ;
      
    if(this.props.loginDetails.currentUser){
      if(!this.props.trips.all_trips) getAllTripsFromRails()
      toDisplay = 
        <div>
          <Navb 
            signOut={signOut} 
            displayEmail={this.props.loginDetails.currentUser.email}/>
          {this.props.children}
        </div>
    }

    if(!this.props.loginDetails.currentUser){

      toDisplay =
        <LoginBox 
        signInClick={signInClick} 
        loginEmail={loginEmail} 
        user_email={user_email} 
        user_password={user_password} 
        loginPassword={loginPassword} 
        signUpClick={signUpClick} 
        signUploginEmail={signUploginEmail} 
        signUpPasswordConfirm={signUpPasswordConfirm} 
        signUploginPassword={signUploginPassword}
        getUsers ={getUsers}
        />
    }

    return(
      <div>
       {toDisplay}
       </div>
      )

  }

}

const mapDispatchToProps=(dispatch)=>({
  actions: bindActionCreators(actionCreators, dispatch)
})
const mapStateToProps=(state)=>({
  trips: state.trips,
  loginDetails: state.loginDetails
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout)