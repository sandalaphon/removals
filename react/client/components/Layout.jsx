import React from 'react'
import Navb from './Navb'
import {Link} from 'react-router'
import LoginBox from './sign_in/LoginBox'
import SignUp from './account_management/SignUp'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import * as loginActions from '../actions/login_actions'

class Layout extends React.Component {

  componentDidMount(){
    this.props.actions.loginActions.fetchUser()
  }

  render(){

    const {loginEmail, loginPassword, signInClick, signUploginEmail, signUploginPassword,signUpPasswordConfirm, signUpClick, signOut} =                                               this.props.actions.loginActions
    const {getAllTripsFromRails, getUsers} =         this.props.actions.actionCreators
    const {user_email, user_password, currentUser} = this.props.loginDetails
    var toDisplay
      
    // if theres are no trips, get them
    if(currentUser){
      if(!this.props.trips.all_trips) getAllTripsFromRails()
      toDisplay = 
        <div>
          <Navb 
            signOut={signOut} 
            displayEmail={currentUser.email}/>
          {this.props.children}
        </div>
    }

    //if there is no currentuser, show loginbox
    if(!currentUser){

      toDisplay =
        <LoginBox 
        signInClick           = {signInClick} 
        loginEmail            = {loginEmail} 
        user_email            = {user_email} 
        user_password         = {user_password} 
        loginPassword         = {loginPassword} 
        signUpClick           = {signUpClick} 
        signUploginEmail      = {signUploginEmail} 
        signUpPasswordConfirm = {signUpPasswordConfirm} 
        signUploginPassword   = {signUploginPassword}
        getUsers              = {getUsers}
        />
    }

    return(
      <div>
       {toDisplay}
       </div>
      )

  }

}

function mapStateToProps(state){
  return {
    loginDetails: state.login,
    trips: state.trips
  }
}

function mapDispatchToProps(dispatch){
  return { 
    actions:{
      actionCreators: bindActionCreators(actionCreators, dispatch),
      loginActions: bindActionCreators(loginActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)