import React from 'react'
import SignUp from './SignUp'
import UserList from './UserList'
import {Button, Collapse, Well} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as accountManagementActions from '../../actions/account_management_actions.js'
import * as signUpActions from '../../actions/sign_up_actions.js'

class AccountManagement extends React.Component {

  constructor(...args) {
      super(...args);
      this.state = {};
    }

  componentWillMount(){
    this.props.actions.accountActions.getUsers()
  }

  render(){
    var {getUsers, deleteUser, updateAdmin} = this.props.actions.accountActions
    var {signUpClick, signUploginEmail, signUploginPassword, signUpPasswordConfirm} = this.props.actions.signUpActions
  
    return(
      
      <div>
      <Button bsSize="small" bsStyle="success" onClick={ ()=> this.setState({ open: !this.state.open })}>
        Click To Add A User
      </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              <SignUp 
                signUpClick=          {signUpClick} 
                signUploginEmail=     {signUploginEmail} 
                signUploginPassword=  {signUploginPassword}
                signUpPasswordConfirm={signUpPasswordConfirm}
                getUsers=             {getUsers}
              />
            </Well>
          </div>
        </Collapse>

      <Button bsSize="small" bsStyle="success" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
        View Users
      </Button>
        <Collapse in={this.state.open1}>
          <div>
            <Well>
              <UserList 
                updateAdmin=  {updateAdmin} 
                users=        {this.props.accountManagement.users}
                currentUser=  {this.props.login.currentUser}
                deleteUser=   {deleteUser}
              />      
            </Well>
          </div>
        </Collapse>       
      </div>
      )
  }

}

const mapStateToProps=(state)=>({
  accountManagement: state.account_management,
  signUp: state.signUp,
  login: state.login
})

const mapDispatchToProps=(dispatch)=>({
  actions:{
    accountActions: bindActionCreators(accountManagementActions, dispatch),
    signUpActions: bindActionCreators(signUpActions,dispatch)
  } 
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement)

