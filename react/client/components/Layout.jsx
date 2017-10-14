import React from 'react'
import Navb from './Navb'
import {Link} from 'react-router'
import LoginBox from './sign_in/LoginBox'
import SignUp from './account_management/SignUp'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as commonActions from '../actions/_common_actions'
import * as accountManagementActions from '../actions/account_management_actions'
import * as signupActions from '../actions/sign_up_actions'
import * as loginActions from '../actions/login_actions'

class Layout extends React.Component {

  constructor(props){
    super(props)
    this.loaded = false
  }

  componentDidMount(){
    console.log('layout mounted')
    this.props.actions.loginActions.fetchUser()
  }

  componentWillUnmount(){
    console.log('layout unmounted')
  }

  loadData(){
    this.props.actions.commonActions.getAllEmployeesFromRails()
    
    
    this.props.actions.commonActions.getAllSurveysFromRails()
    this.props.actions.commonActions.getAllBranchesFromRails()  
    this.props.actions.commonActions.getAllTripsFromRails()
    this.props.actions.commonActions.getRosCandidatesFromRails()

    
  }

  render(){


    const {loginEmail, loginPassword, signInClick, signOut} =                           this.props.actions.loginActions
    const { getUsers} =                                                                 this.props.actions.accountManagementActions
    const { signUploginEmail, signUploginPassword,signUpPasswordConfirm, signUpClick} = this.props.actions.signUpActions
    const { getAllTripsFromRails, getAllBranchesFromRails, getAllEmployeesFromRails}  = this.props.actions.commonActions
    const { user_email, user_password, currentUser} =                                   this.props.loginDetails
    var toDisplay

    if(currentUser){

        if(!this.loaded){
        this.loaded=true 
          this.loadData()
        }
        
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

const mapStateToProps=(state)=>({
  loginDetails: state.login,
  trips: state.common
  

})
  
const mapDispatchToProps=(dispatch)=>({
  actions:{
    commonActions:              bindActionCreators( commonActions, dispatch ),
    accountManagementActions :  bindActionCreators( accountManagementActions, dispatch ),
    loginActions:               bindActionCreators( loginActions, dispatch ),
    signUpActions:              bindActionCreators( signupActions, dispatch )
  }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Layout)